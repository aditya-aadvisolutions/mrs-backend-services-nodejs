import express from 'express';
import { getNotification, saveNotification } from '../controllers/notification.controller';

const notification=express.Router();


//Route to handle fetching notification
notification.get('/getnotifications', getNotification);

//Route to handle for saving notification
notification.post('/savenotification', saveNotification);



export default notification;
