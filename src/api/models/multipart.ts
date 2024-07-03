export class UploadInfo {
    filename: string;
    type: string;

    constructor(filename: string, type: string) {
        this.filename = filename;
        this.type = type;
    }
}