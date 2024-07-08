import { Request, Response } from 'express';
import { UploadFileModal, AdminFileUpload } from '../models/adminFileUpload';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import AdminSaveUploadFileService from '../services/adminFileUpload.service';
import MrsDatabase from '../../infra/database/mrs_db_connection';

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

      const parsedJobFiles: UploadFileModal[] = UploadFiles.map((file: any) => ({
        filename: file.filename,
        fileextension: file.fileextension,
        filepath: file.filepath,
        size: file.size,
        fileId: file.fileId,
        // pageCount: file.pageCount,
      }));

      const jobData: AdminFileUpload = {
        jobId,
        createdBy,
        UploadFiles: parsedJobFiles
      };

      const success = await this.adminService.saveUploadFile(jobData);

      result.data = success;
      result.isSuccess = true;

      // Trigger page count update
      await this.GetPageCountForUploadFiles(parsedJobFiles, this.adminService);

      res.json(result);
    } catch (error) {
      console.error('Error in AdminFileUploadController:', error);
      result.data = error.message;
      res.status(500).json(result);
    }
  };

  private GetPageCountForUploadFiles = async (uploadFiles: UploadFileModal[], adminFileUploadServiceInstance: AdminSaveUploadFileService): Promise<void> => {
    const sb = new StringBuilder();
    sb.append('<Files>');

    try {
      await Promise.all(uploadFiles.map(async (file) => {
        const filePath = path.resolve(file.filepath);
        const fileExtension = path.extname(file.filename);

        if (fileExtension === '.pdf') {
          const pdfBuffer = fs.readFileSync(filePath);
          const pdfDocument = await PDFDocument.load(pdfBuffer);
          const pageCount = pdfDocument.getPageCount();
          sb.appendLine(`<FileInfo id="${file.fileId}" pageCount="${pageCount}" />`);
        }
      }));

      sb.appendLine('</Files>');
      await adminFileUploadServiceInstance.updatePageCount(sb.toString());
    } catch (error) {
      console.error('Error in GetPageCountForUploadFiles:', error);
    }
  };
}

class StringBuilder {
  private value: string = '';

  append(text: string): void {
    this.value += text;
  }

  appendLine(text: string): void {
    this.value += text + '\n';
  }

  toString(): string {
    return this.value;
  }
}
