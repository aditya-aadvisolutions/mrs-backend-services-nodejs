import { Sequelize, QueryTypes } from 'sequelize';
import { AdminFileUpload, UploadFileModal } from '../models/adminFileUpload';

class AdminSaveUploadFileService {
  private readonly sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async saveUploadFile(jobData: AdminFileUpload): Promise<boolean> {
    try {
      const jobFilesParameter = this.createTableValuedParameter(jobData.UploadFiles, jobData.createdBy, jobData.jobId);

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
        jobData.jobId,
        jobData.createdBy,
      ];

      await this.sequelize.query(sqlQuery, {
        type: QueryTypes.RAW,
        replacements: replacements,
      });
      return true;
    } catch (error) {
      console.error('Error in saveUploadFile:', error);
      return false;
    }
  }

  private createTableValuedParameter(jobFiles: UploadFileModal[], createdBy: string, jobId: string): any[] {
    return jobFiles.map((file) => [
      file.filename,
      file.fileextension,
      file.filepath,
      createdBy,
      file.fileId,
    ]);
  }
}

export default AdminSaveUploadFileService;
