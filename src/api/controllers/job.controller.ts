import {Request, Response} from  'express';
import { JobService } from '../services/job.service';
import { ApiResult } from '../models/apiResult';
//import { MergeJob } from '../models/job';

//import validateUUID from 'uuid-validate';


const jobService =new JobService();

/**
 * Handler to fetch jobs based on filter parameters
 
 */

        export const getJobs = async (req: Request, res: Response) => {
            try {
                const { userId, jobId, jobStatus, createdBy, filename, fromDate, toDate, initialLoad } = req.query;
                
                // Fetch jobs using the job service
                const jobs = await jobService.getJobs(
                    userId as string,
                    jobId as string,
                    jobStatus as string,
                    createdBy as string,     
                    filename as string,
                    fromDate as string,
                    toDate as string,
                    initialLoad === 'true' // Convert initialLoad to boolean
                );
        
        
                const result: ApiResult<any> = {
                    isSuccess: true,
                    message: null,
                    data: jobs
                };
        
                res.json(result);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                const result: ApiResult<any> = {
                    data: null,
                    isSuccess: false,
                    message: error.message
                };
        
                res.status(500).json(result);
            }

        }

/**
 * Handler to delete a job
 */
export const deleteJob=async(req: Request, res: Response)=>{
    try {
        const {jobId, userId, status}=req.query;

        //Delete a job using jobservice
        const resultFromService=await jobService.deleteJobs(jobId as string, userId as string, status as string )
        const result: ApiResult<any>={
            
            isSuccess: resultFromService.IsSuccess,
            message: null,
            data: resultFromService.ResultCount,
        }
        res.json(result);
    } catch (error) {
        const result: ApiResult<any>={
            data: null,
            isSuccess: false,
            message: error.message

        }
        res.json(result)
        
    }
}
/**
 * Handler to update the status of the job
 
 */

    export const updateJobStatus=async (req: Request, res: Response)=>{
        try{
            const {jobId, userId, status}=req.query;

            //Update the status of the job using jobservice
            const resultFromService=await jobService.updateJobStatus(jobId as string, userId as string, status as string);
            const result: ApiResult<any>={
                
                isSuccess: resultFromService.IsSuccess,
                message: null,
                data: resultFromService.ResultCount
            }
            res.json(result);

        }catch(error) {
            const result: ApiResult<any>={
                data: null,
                isSuccess: false,
                message: error.message
    
            }
            res.json(result)
            
        }

}

/**
 * Habdler to merge a job, multiple single jobs are merged and creates a single job
 
 */

export const mergeJobs=async (req: Request, res: Response)=>{
    try {
        const {jobIds, userId, createdBy, companyId}=req.body;
        //Merge job using jobservice
        const resultFromService= await jobService.mergeJobs(jobIds.join(','), userId, createdBy, companyId);

        
        const result: ApiResult<any>={
            
            isSuccess: true,
            message: null,
            data: resultFromService.ResultCount,
        }

        res.status(200).json(result);
        
    } catch (error) {
        const result:ApiResult<any>={
            data: null,
            isSuccess: false,
            message: error.message
        }
        res.status(500).json(result);
        
    }
}



