import { QueryTypes } from "sequelize";
import { JobFileType, JobModal } from "../models/saveJob";
import sql from 'mssql';
import MrsDatabase from "../../infra/database/mrs_db_connection";
class SaveJobService {
  private isValidGuid(value: string): boolean {
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(value);
  }
  async saveJob(job: JobModal): Promise<boolean> {

    try {
      // const request = new MrsDatabase();

      const pool = await MrsDatabase;
      const request = new sql.Request(pool);
      if (!this.isValidGuid(job.Tat) || !this.isValidGuid(job.CompanyId) || !this.isValidGuid(job.CreatedBy)) {
        throw new Error('Invalid GUID format for Priority, CompanyId, or CreatedBy');
      }

      // Validate GUIDs and create a Table instance
      const table = new sql.Table('JobFileType');
      table.columns.add('FileName', sql.NVarChar(255));
      table.columns.add('FileExtension', sql.NVarChar(10));
      table.columns.add('SourceFilePath', sql.NVarChar(255));
      table.columns.add('CreatedBy', sql.NVarChar(255));
      table.columns.add('FileId', sql.NVarChar(255));

      job.UploadFiles.forEach((jobFile: JobFileType) => {
        table.rows.add(jobFile.FileName, jobFile.FileExtension, jobFile.SourceFilePath, jobFile.CreatedBy, jobFile.FileId);
      });

      // Add parameters to request
      request.input('JobFiles', sql.TVP('JobFileType'), table);
      request.input('JobName', sql.NVarChar, job.MergeFilename);
      request.input('Priority', sql.UniqueIdentifier, job.Tat);
      request.input('Notes', sql.NVarChar, job.Comment);
      request.input('IsSingleJob', sql.Bit, job.UploadType);
      request.input('CompanyId', sql.UniqueIdentifier, job.CompanyId);
      request.input('CreatedBy', sql.UniqueIdentifier, job.CreatedBy);
      console.log("Save successful");

      // Call the stored procedure
      const data = await request.execute('usp_SaveJob');

      console.log(data, "Save successful");
      return true;
    } catch (error) {
      console.error('Error saving job:', error);
      return false;
    }
  }

}

export default new SaveJobService



