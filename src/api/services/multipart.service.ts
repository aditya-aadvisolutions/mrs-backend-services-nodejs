import { UploadInfo } from "../models/multipart";

export class MultipartService {
    static processUpload(fileInfo: { filename: string, type: string }): UploadInfo {
        return new UploadInfo(fileInfo.filename, fileInfo.type);
    }
}
