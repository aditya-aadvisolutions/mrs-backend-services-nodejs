import fs from 'fs';
import axios from 'axios';
import path from 'path';
import { promisify } from 'util';
import { MissingPDFHeaderError, PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';

const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

export class PageCount {
  async downloadFile(url: string, dest: string): Promise<void> {
    const writer = fs.createWriteStream(dest);

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error: Error | null = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve();
        }
      });
    });
  }

  async getPdfPageCount(filePath: string): Promise<number> {
    try {
      const data = await readFile(filePath);
      const pdfDoc = await PDFDocument.load(data);
      return pdfDoc.getPageCount();
    }  catch (error) {
      if (error instanceof MissingPDFHeaderError) {
        console.error(`Error parsing PDF file: ${error.message}`);
        return 0; // Set page count to 0 for corrupted PDF files
      } else {
        throw error; // Rethrow other errors
      }
    }
  }

  async getWordPageCount(filePath: string): Promise<number> {
    const data = await readFile(filePath);
    const result = await mammoth.extractRawText({ buffer: data });
    const text = result.value;
    const lines = text.split(/\r?\n/);
    const linesPerPage = 45; // Average lines per page assumption
    return Math.ceil(lines.length / linesPerPage);
  }

  async getPageCountForUploadFiles(uploadFiles: any[], tempDir: string): Promise<void> {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tasks = uploadFiles.map(async (file) => {
      const fileInfo = new URL(file.filepath);
      let pageCount = 0;
      const localFilePath = path.join(tempDir, file.filename);
      try {
        await this.downloadFile(file.filepath, localFilePath);

        if (fileInfo.pathname.endsWith('.pdf')) {
          try {
            pageCount = await this.getPdfPageCount(localFilePath);
          } catch (error) {
            console.error(`Error parsing PDF file: ${error.message}`);
            pageCount = 0; // Set page count to 0 for corrupted PDF files
          }
        } else if (fileInfo.pathname.endsWith('.doc') || fileInfo.pathname.endsWith('.docx')) {
          pageCount = await this.getWordPageCount(localFilePath);
        } else {
          console.warn(`Unsupported file type: ${file.filepath}`);
        }
      } catch (error) {
        console.error(`Error processing file ${file.filename}: ${error.message}`);
      } finally {
        file.pageCount = pageCount; // Add page count to the file object
        // Clean up the downloaded file
        if (fs.existsSync(localFilePath)) {
          await unlink(localFilePath);
        }
      }
    });
    await Promise.all(tasks);
  }
 
  async getTotalPageCount(uploadFiles: any[], tempDir: string): Promise<number> {
    await this.getPageCountForUploadFiles(uploadFiles, tempDir);
    return uploadFiles.reduce((total, file) => total + (file.pageCount || 0), 0);
  }

}
