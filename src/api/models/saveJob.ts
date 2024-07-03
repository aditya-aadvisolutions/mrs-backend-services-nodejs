export type JobModal = {
    UploadFiles: JobFileType[];
    MergeFilename?: string;
    Tat?: string;
    Comment?: string;
    UploadType?: boolean;
    CompanyId?: string;
    CreatedBy?: string;
}

export type JobFileType = {
    FileName: string;
    FileExtension: string;
    SourceFilePath: string;
    CreatedBy: string;
    FileId: string;
}