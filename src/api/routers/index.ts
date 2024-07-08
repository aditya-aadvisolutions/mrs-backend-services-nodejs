import express from 'express';
import { deleteJob, getJobs, mergeJobs, updateJobStatus } from '../controllers/job.controller';
import { verifyLogin } from '../controllers/logincontroller';
import { getJobCount } from '../controllers/dashboardcontroller';
import { getNotification, saveNotification } from '../controllers/notification.controller';
//import { getNotification, saveNotification } from "../controller/notificationController";
//import { verifyLogin, refreshToken } from '../controller/loginController';
//import {getUserLookUp, getStatusLookUp} from '../controller/lookupController'

const router=express.Router();

const app=express();

app.use(express.json());

app.use(express.urlencoded({extended: true}))

router.get('/', (req, res)=>{
    res.send("Server is running")

})
//Route to handle the fetching of jobs based on provided filters
router.get('/Job/getjobs', getJobs);

//Route to handle the deletion of a job
router.get('/Job/deletejob', deleteJob);

//Route to handle updating the status of a job
router.get('/Job/updateJobStatus', updateJobStatus);

//Route to handle the merging multiple files
router.post('/Job/mergejobs', mergeJobs);

//Route to handle fetching notification
router.get('/Notification/getnotifications', getNotification);

//Route to handle for saving notification
router.post('/Notification/savenotification', saveNotification);

//Route to handle verifying user login
router.post('/Login/verifylogin', verifyLogin);

router.get('/dashboard', getJobCount);

//Route to handle referesh token
//router.post('/refreshtoken', )

//route to handle fetching LookUpUsers
//router.get('/getuserlookup', getUserLookUp );

//route to handle fetching Lookupstatus
//router.get('/getlookupstatus', getStatusLookUp)

//route to get the refreshToke
//router.post('/refreshtoken', refreshToken)




export default router;
