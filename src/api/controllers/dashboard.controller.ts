import {Request, Response, Router} from 'express'
import { DashboardServices } from '../services/dashboard.service'
import { ApiResult } from '../models/apiResult';

const dashboardservices= new DashboardServices();

export const getJobCount=async (req: Request, res: Response) =>{
    const {username}=req.query;


   try{
     const resultFromService= await dashboardservices.dashboard(username as string);
    
        const result: ApiResult<any[]>={
            Data: resultFromService,
            IsSuccess: true
        }

     res.json(result)

    }

catch(error){
    const result: ApiResult<any>={
        Data: null,
        IsSuccess: false,
        Message: error.message

    }
    res.status(500).json(result); 
}

}