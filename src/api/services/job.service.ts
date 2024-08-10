
import {Job} from '../models/job'
import { QueryTypes } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export class JobService{
    
    async getJobs(userId,jobId = null, jobStatus = null, createdBy = null, filename = null, fromDate = null, toDate = null, initialLoad = false) {        
        try {
            const replacements = {
                JobStatus: jobStatus === '' ? null : jobStatus,
                CreatedBy: createdBy === '' ? null : createdBy,
                UserId: userId,
                JobId: jobId === '' ? null : jobId,
                Filename: filename === '' ? null : filename,
                FromDate: fromDate === '' ? null : fromDate,
                ToDate: toDate === '' ? null : toDate,
                InitialLoad: initialLoad === true ? 'true' : 'false'
            };
    
            const sqlQuery = `EXEC USP_GetJobs 
                @JobStatus = :JobStatus,
                @CreatedBy = :CreatedBy, 
                @JobId = :JobId,
                @UserId = :UserId, 
                @Filename = :Filename, 
                @FromDate = :FromDate,
                @ToDate = :ToDate,
                @InitialLoad = :InitialLoad`;
    
            const result = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW
            });
    
            if (!result || !result[0]) {
                return [];
            }
    
            const jobs = result[0].map(record => ({
                id: record.Id,
                jobId: record.JobId,
                assignTo: record.AssignTo,
                companyId: record.CompanyId,
                createdBy: record.CreatedBy,
                createdDateTime: record.CreatedDateTime,
                isDeleted: record.IsDeleted,
                isSingleJob: record.IsSingleJob,
                jobFiles: record.JobFiles,
                l1User: record.L1User,
                l2User: record.L2User,
                l3User: record.L3User,
                modifiedDateTime: record.ModifiedDateTime,
                modifyedBy: record.ModifyedBy,
                name: record.Name,
                notes: record.Notes,
                parentJobId: record.ParentJobId,
                priority: record.Priority,
                status: record.Status,
                statusName: record.StatusName,
                userName: record.UserName,
                unReadMessages: record.UnReadMessages,
                filePreference: record.FilePreference,
                tat: record.Tat
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

