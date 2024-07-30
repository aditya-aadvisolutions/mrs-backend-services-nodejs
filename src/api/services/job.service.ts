
import {Job} from '../models/job'
import { QueryTypes } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export class JobService{
    
    async getJobs(userId: string, jobStatus?:string, createdBy?:string, filename?:string, jobId?: string, fromDate?: string, toDate?: string,  initialLoad?: boolean): Promise<Job[]>{
        try {

            const replacements = {
                JobId: jobId || null,
                JobStatus: jobStatus || null,
                CreatedBy: createdBy || null,
                UserId: userId,
                Filename: filename || null,
                FromDate: fromDate || null,
                ToDate: toDate || null,
                InitialLoad: initialLoad ?? null
            };

            const sqlQuery = `EXEC USP_GetJobs3 
                @JobId = :JobId,
                @JobStatus = :JobStatus,
                @CreatedBy = :CreatedBy, 
                @UserId = :UserId, 
                @Filename = :Filename, 
                @FromDate = :FromDate,
                @ToDate = :ToDate,
                @InitialLoad = :InitialLoad`;

                const result: any = await MrsDatabase.query(sqlQuery, {
                    replacements: replacements,
                    type: QueryTypes.RAW
                });
    
               
    
                if (!result || !result[0]) {
                   
                    return [];
                }
    
                const jobs: Job[] = result[0].map((record: any) => ({
                    id: record.Id as string,
                    jobId: record.JobId as number,
                    assignTo: record.AssignTo as string,
                    companyId: record.CompanyId as string,
                    createdBy: record.CreatedBy as string,
                    createdDateTime: record.CreatedDateTime as Date,
                    isDeleted: record.IsDeleted as boolean,
                    isSingleJob: record.IsSingleJob as boolean,
                    jobFiles: record.JobFiles as string,
                    l1User: record.L1User as string,
                    l2User: record.L2User as string,
                    l3User: record.L3User as string,
                    modifiedDateTime: record.ModifiedDateTime as Date,
                    modifyedBy: record.ModifyedBy as string,
                    name: record.Name as string,
                    notes: record.Notes as string,
                    parentJobId: record.ParentJobId as string,
                    priority: record.Priority as string,
                    status: record.Status as string,
                    statusName: record.StatusName as string,
                    userName: record.UserName as string,
                    unReadMessages: record.UnReadMessages as number,
                    filePreference: record.FilePreference as string,
                    tat: record.Tat as string,
                }));
                return jobs;
            } catch (error) {
                console.error("Error executing stored procedure:", error);
                throw new Error(error.message);
            }
        }
     
    async deleteJobs(jobId: string, userId: string, status: string){
        try {
           const sqlQuery= `exec USP_DELETEJOB 
           @JobId=:JobId, @UserId=:UserId, @Status=:Status`;
           
       
           const result=await MrsDatabase.query(sqlQuery, {
            replacements: {
                JobId: jobId,
                UserId: userId,
                Status: status
            },
            type: QueryTypes.RAW
           });
//Stored Prcedure returns an array and no. of rows affected 
           const rowsAffected=result[1];
            
            return { ResultCount: rowsAffected, 
                IsSuccess: true };
            
        } catch (error) {
            throw new Error(error.message);
            console.log(error)
        }
    }


    async updateJobStatus(jobId: string, userId: string, status: string){
        try {
            const replacements= {
                JobId: jobId,
                UserId: userId,
                Status: status
            }

            const sqlQuery=`exec usp_UpdateJobStatus 
            @JobId = :JobId,
            @UserId = :UserId,
            @Status= :Status`;


            const result: any = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW
            });
            const rowsAffected=result[1];
            

            return {ResultCount: rowsAffected, 
                IsSuccess: true}
        } catch (error) {
            throw new Error(error.message)
            
        }
    }

    async mergeJobs(jobIds: string, userId: string, createdBy: string, companyId: string){
        try {
          
            const replacements={
                JobIds: jobIds,
                UserId: userId,
                CreatedBy: createdBy,
                CompanyId: companyId
            }

            const sqlQuery=` exec usp_MergeJobs
            @JobIds = :JobIds,
            @UserId = :UserId,
            @CreatedBy = :CreatedBy,
            @CompanyId = :CompanyId`;

            const result = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW,
            });
            const rowsAffected=result[1] as number;


            
            
       // Access rowsAffected from the result (adjust based on Sequelize result structure)
            
            return {
                ResultCount:rowsAffected,
                IsSuccess: true
            }
            
        } catch (error) {throw new Error(error.message)
            
        }
    }


}

