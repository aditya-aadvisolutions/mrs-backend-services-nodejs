import { UUID } from "crypto";

export type JobModal = {
    uploadfiles: JobFileType[];
    mergeFilename?: string;
    tat: string;
    comment?: string;
    uploadtype?: boolean;
    companyId: string;
    createdBy: string;
    
}

export type JobFileType = {
    filename: string;
    fileextension: string;
    filepath: string;
    fileId: UUID;
    size: number;
    pageCount: number;
}
