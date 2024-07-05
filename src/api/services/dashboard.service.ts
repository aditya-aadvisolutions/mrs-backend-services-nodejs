import { threadId } from "worker_threads";
import MrsDatabase from "../../infra/database/mrs_db_connection";

import { Dashboard } from '../models/dashboard';
import { QueryTypes } from 'sequelize';

export class DashboardServices{
    async dashboard (username: string): Promise<Dashboard<any> | null>{
       try {const replacements ={
            LoginName: username
        }

        const sqlQuery = `exec USP_GetClientJobCounts
        @LoginName = :LoginName`;

        const [result] = await MrsDatabase.query(sqlQuery, {
            replacements: replacements,
            type: QueryTypes.RAW
        });
        const record=result[0];
        if(record){
            const count: Dashboard<any> ={
                PendingJobsCount: record.PendingJobsCount,
                CompletedJobsCount: record.CompletedJobsCount,
                ClientsCount: record.ClientCount

            }
            return count;

        }else 
        {
            console.log("No records Found")
        }

        
}catch(error){
    throw new Error (error.message)
}
    }
}