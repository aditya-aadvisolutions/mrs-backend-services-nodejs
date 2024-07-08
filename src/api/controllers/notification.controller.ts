import {Request, Response, Router} from "express";
import { Notification } from "../models/notification";
import { ApiResult } from "../models/apiResult";
import { NotificationSerivce } from "../services/notification.service";

const router= Router();
const notificationService=new NotificationSerivce();
//this api is used to get the notification of the particular JobId
export const getNotification=async(req: Request, res: Response) =>{
    const {jobId, userId}= req.query as {jobId: string, userId: string};

    try {
        const notifications= await notificationService.getNotifications(jobId, userId);
        const result: ApiResult<Notification[]>={
            isSuccess: true,
            message: null,
            data: notifications

        }
        return res.json(result);
        
    } catch (ex: any) {
        const result: ApiResult<null>={
            isSuccess: true,
            data: null,
            message: ex.message
        }
        return res.status(500).json(result);
        
    }
}
export const saveNotification=async (req:Request, res: Response) =>{
    const notification: Notification=req.body;

    try {
        const saveNotification=await notificationService.saveNotification(notification);
        const result: ApiResult<Notification[]>={
            isSuccess: true,
            message: null,
            data: saveNotification
 
        }

        res.status(200).json(result);

    } catch (ex: any) {

        const result: ApiResult<null>={
            isSuccess: true,
            data: null,
            message: ex.message
        }
        res.status(500).json(result);
        
    }
}
