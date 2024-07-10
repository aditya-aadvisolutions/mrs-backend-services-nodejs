import express from 'express';
import { deleteJob, getJobs, mergeJobs, updateJobStatus } from '../controllers/job.controller';
import { verifyLogin } from '../controllers/logincontroller';
import { getNotification, saveNotification } from '../controllers/notification.controller';
//import { getNotification, saveNotification } from "../controller/notificationController";
//import { verifyLogin, refreshToken } from '../controller/loginController';
//import {getUserLookUp, getStatusLookUp} from '../controller/lookupController'

const jobrouter=express.Router();



//Route to handle the fetching of jobs based on provided filters
jobrouter.get('/getjobs', getJobs);

//Route to handle the deletion of a job
jobrouter.get('/deletejob', deleteJob);

//Route to handle updating the status of a job
jobrouter.get('/updateJobStatus', updateJobStatus);

//Route to handle the merging multiple files
jobrouter.post('/mergejobs', mergeJobs);



export default jobrouter;
