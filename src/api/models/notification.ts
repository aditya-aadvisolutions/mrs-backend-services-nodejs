export interface Notification{
    id?: string;
  jobId: string;
  userId: string;
  comments: string;
  isReadMessage?: boolean;
  createdByName?: string;
  createdDateTime?: Date;
}