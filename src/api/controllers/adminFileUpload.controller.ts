import MrsDatabase from "../../infra/database/mrs_db_connection";
import { AdminFileUpload, UploadFileModal } from "../models/adminFileUpload";
import AdminSaveUploadFileService from "../services/adminFileUpload.service";
import { Request, Response } from "express";
import { PDFDocument } from 'pdf-lib';

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
        UploadFiles.map(async (file: any) => {
          const pdfBuffer = file.buffer;
          let pageCount = 0;

          if (file.fileextension === 'pdf') {
            const pdf = await PDFDocument.load(pdfBuffer);
            pageCount = pdf.getPageCount();
          }

          return {
            filename: file.filename,
            fileextension: file.fileextension,
            filepath: file.filepath,
            size: file.size,
            fileId: file.fileId,
            pageCount,
          } as UploadFileModal;
        })
      );

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
