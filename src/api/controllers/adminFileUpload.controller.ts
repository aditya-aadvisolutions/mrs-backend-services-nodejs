import MrsDatabase from "../../infra/database/mrs_db_connection";
import { AdminFileUpload, UploadFileModal } from "../models/adminFileUpload";
import AdminSaveUploadFileService from "../services/adminFileUpload.service";
import { Request, Response } from "express";
import { PageCount } from "../../utils/pagecount";
import path from 'path';

const pageCountObj = new PageCount();

export class AdminFileUploadController {
  private adminService: AdminSaveUploadFileService;

  constructor() {
    this.adminService = new AdminSaveUploadFileService(MrsDatabase);
  }

  public AdminFileUpload = async (req: Request, res: Response): Promise<void> => {
    const result = { data: null, isSuccess: false };

    try {
      const { UploadFiles, jobId, createdBy } = req.body as AdminFileUpload;

      if (!Array.isArray(UploadFiles)) {
        throw new Error('UploadFiles should be an array');
      }

      const parsedJobFiles: UploadFileModal[] = await Promise.all(
        UploadFiles.map(async (file: any) => ({
          filename: file.filename,
          fileextension: file.fileextension,
          filepath: file.filepath,
          size: file.size,
          fileId: file.fileId,
          pageCount: file.pageCount,
        }))
      );
/*
      // Get page count for uploaded files
      await pageCountObj.getPageCountForUploadFiles(parsedJobFiles, path.join(__dirname, 'temp'));

      // Console log the file details along with page count
      parsedJobFiles.forEach(file => {
        console.log(`File ID: ${file.fileId}, Filename: ${file.filename}, Page Count: ${file.pageCount}`);
      });

*/
      const jobData: AdminFileUpload = {
        jobId,
        createdBy,
        UploadFiles: parsedJobFiles,
      };

      const success = await this.adminService.saveUploadFile(jobData);

      result.data = success;
      result.isSuccess = true;

      res.json(result);
    } catch (error) {
      console.error('Error in AdminFileUploadController:', error);
      result.data = error.message;
      res.status(500).json(result);
    }
  };
}
