import { Sequelize, QueryTypes } from 'sequelize';
import { AdminFileUpload, UploadFileModal } from '../models/adminFileUpload';

class AdminSaveUploadFileService {
  private readonly sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  private isValidGuid(value: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  }

  public async saveUploadFile(jobData: AdminFileUpload): Promise<boolean> {
    try {
      const { jobId, createdBy, UploadFiles } = jobData;

      if (!this.isValidGuid(jobId) || !this.isValidGuid(createdBy)) {
        throw new Error('Invalid GUID format for JobId or CreatedBy');
      }

      const jobFilesParameter = this.createTableValuedParameter(UploadFiles, createdBy);

      const sqlQuery = `
        DECLARE @JobFiles JobFiletype;

        INSERT INTO @JobFiles ([FileName], [FileExtension], [SourceFilePath], [CreatedBy], [FileId])
        VALUES ${jobFilesParameter.map(() => '(?, ?, ?, ?, ?)').join(', ')};

        EXEC usp_AdminSaveUploadFile 
          @JobId = ?, 
          @CreatedBy = ?,  
          @JobFiles = @JobFiles;
      `;

      const replacements = [
        ...jobFilesParameter.flat(),
        jobId,
        createdBy
      ];

      const result: any = await this.sequelize.query(sqlQuery, {
        type: QueryTypes.RAW,
        replacements: replacements,
      });

      console.log(result, "result");
      return result[0].returnValue === 0;
    } catch (error) {
      console.error('Error in saveUploadFile:', error);
      return false;
    }
  }

  public async updatePageCount(fileXml: string): Promise<boolean> {
    try {
      const sqlQuery = 'EXEC usp_UpdatePageCount @FileXml=:FileXml';
      const result: any = await this.sequelize.query(sqlQuery, {
        replacements: { FileXml: fileXml },
        type: QueryTypes.RAW,
      });

      return result[0].returnValue === 0;
    } catch (error) {
      console.error('Error in updatePageCount:', error);
      return false;
    }
  }

  private createTableValuedParameter(jobFiles: UploadFileModal[], createdBy: string): any[] {
    console.log(jobFiles, "job")
    return jobFiles.map((file) => [
      file.filename,
      file.fileextension,
      file.filepath,
      createdBy,
      file.fileId,
      file.pageCount == null
    ]);
  }
}

export default AdminSaveUploadFileService;
