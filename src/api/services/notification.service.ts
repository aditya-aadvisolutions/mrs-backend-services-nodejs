import MrsDatabase from "../../infra/database/mrs_db_connection";
import { ApiResult } from "../models/apiResult";
import { QueryTypes } from "sequelize";
import { Notification } from "../models/notification";


export class NotificationSerivce{

    async getNotifications(jobId: string, userId: string){

    try {
        const replacements={
            JobId: jobId,
            UserId: userId
        }
        const sqlQuery= `exec USP_GetNotifications 
        @JobId= :JobId,
        @UserId= :UserId `;

        const result= await MrsDatabase.query(sqlQuery,{
            replacements: replacements,
            type: QueryTypes.RAW
        })

            // Check if result is as expected
            if (!result || result.length === 0) {
                throw new Error("No notifications found");
            }
        const notifications: Notification[]=result[0].map((record: any) => ({
            id: record.Id,
            jobId: record.JobId,
            userId, // userId is passed as a parameter
            comments: record.Comments,
            isReadMessage: record.IsReadMessage,
            createdByName: record.CreatedByName,
            createdDateTime: record.CreatedDateTime
        }));

        return notifications;

    } catch (error) {
        throw new Error(error.message)
    }
    }

    async saveNotification(notification:Notification): Promise<number>{
        try {
            const replacements={
                Id: notification.id,
                JobId: notification.jobId,
                USerId: notification.userId,
                Comments: notification.comments,
                IsReadMessage: notification.isReadMessage,
                CreatedByName: notification.createdByName,
                createdDateTime: notification.createdDateTime,
                UserId: notification.userId
            }

            const sqlQuery= `exec USP_INSERTNOTIFICATION
            @JobId= :JobId,
            @UserId= :UserId,
            @Comments= :Comments`;

            const result = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW
            }
        )
            

            return result[1];

        } catch (error) {
            throw new Error(error.message)
        
        }
    }

    
}