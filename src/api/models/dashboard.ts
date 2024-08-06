export interface Dashboard <T> {

    PendingJobsCount: number;
    CompletedJobsCount: number;
    ClientsCount: Number;
    EmployeesCount: number;
    InProgressJobsCount: number;
    VoidJobsCount: number;
    DuplicateJobsCount: number;
    DownloadedJobsCount: number;
}