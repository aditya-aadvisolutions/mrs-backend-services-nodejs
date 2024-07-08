import { UUID } from "crypto";

export type UploadFileModal =  {
    filename?: string;
    filepath?: any;
    fileextension?: string;
    size?: any | null;
    fileId: string;
    pageCount?: any | null
}

export interface AdminFileUpload {
    jobId: UUID;
    UploadFiles: UploadFileModal[];
    createdBy: string
}