import { Sequelize, QueryTypes } from 'sequelize';
import { JobModal, JobFileType } from '../models/saveJob';

class SaveJobService {
  private readonly sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  private isValidGuid(value: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  }

  async saveJob(job: JobModal): Promise<boolean> {
    try {
      if (!this.isValidGuid(job.tat!) || !this.isValidGuid(job.companyId!) || !this.isValidGuid(job.createdBy!)) {
        throw new Error('Invalid GUID format for Priority, CompanyId, or CreatedBy');
      }

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
