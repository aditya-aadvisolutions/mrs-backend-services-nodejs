import { Sequelize, QueryTypes } from 'sequelize';
import { JobModal, JobFileType } from '../models/saveJob';
import {PageCount} from '../../utils/pagecount';
import path from 'path';
import xmlbuilder from 'xmlbuilder';



class SaveJobService {
  private readonly sequelize: Sequelize;
  private pageCountObj: PageCount;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
    this.pageCountObj = new PageCount();
  }

  private isValidGuid(value: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  }

  private generatePageCountXml(jobFiles: JobFileType[]): string {
    const root = xmlbuilder.create('Files');
    jobFiles.forEach(file => {
      root.ele('FileInfo', { id: file.fileId, pageCount: file.pageCount });
    });
    return root.end({ pretty: true });
  }

  private async updatePageCountsInDatabase(jobFiles: JobFileType[]): Promise<void> {
    
    const validFiles = jobFiles.filter(file => file.pageCount !== null);
    const fileXml = this.generatePageCountXml(validFiles);
    const sqlQuery = `EXEC usp_UpdatePageCount @FileXml = :fileXml;`;

    await this.sequelize.query(sqlQuery, {
      type: QueryTypes.RAW,
      replacements: { fileXml },
    });
  }

  async saveJob(job: JobModal): Promise<boolean> {
    try {
      if (!this.isValidGuid(job.tat!) || !this.isValidGuid(job.companyId!) || !this.isValidGuid(job.createdBy!)) {
        throw new Error('Invalid GUID format for Priority, CompanyId, or CreatedBy');
      }

       // Calculate page count for each file
      const tempDir = path.join(__dirname, 'temp');
      await this.pageCountObj.getPageCountForUploadFiles(job.uploadfiles, tempDir);
      job.uploadfiles.forEach(file => {
        if (file.pageCount === null || file.pageCount === undefined) {
          file.pageCount = 0;
        }
      });

      // Log the page counts for the uploaded files
      console.log('Page counts for uploaded files:', job.uploadfiles.map(file => ({
        fileId: file.fileId,
        pageCount: file.pageCount
      })));



      const jobFilesParameter = this.createTableValuedParameter(job.uploadfiles, job.createdBy!);

      const sqlQuery = `
        DECLARE @JobFiles JobFiletype;

        INSERT INTO @JobFiles ([FileName], [FileExtension], [SourceFilePath], [CreatedBy], [FileId])
        VALUES ${jobFilesParameter.map(() => '(?, ?, ?, ?, ?)').join(', ')};

        EXEC usp_SaveJob 
          @JobFiles = @JobFiles, 
          @JobName = ?, 
          @Priority = ?, 
          @Notes = ?, 
          @IsSingleJob = ?, 
          @CompanyId = ?, 
          @CreatedBy = ?;
      `;

      const replacements = [
        ...jobFilesParameter.flat(),
        job.mergeFilename,
        job.tat,
        job.comment,
        job.uploadtype,
        job.companyId,
        job.createdBy
      ];

      const result = await this.sequelize.query(sqlQuery, {
        type: QueryTypes.RAW,
        replacements: replacements,
      });
      console.log(result, "result")
      await this.updatePageCountsInDatabase(job.uploadfiles);

      return true;

    } catch (error) {
      console.error('Error saving job:', error);
      return false;
    }
  }

  private createTableValuedParameter(jobFiles: JobFileType[], createdBy: string): any[] {
    return jobFiles.map((file) => [
      file.filename,
      file.fileextension,
      file.filepath,
      createdBy,
      file.fileId
    ]);
  }
  
}




export default SaveJobService;
