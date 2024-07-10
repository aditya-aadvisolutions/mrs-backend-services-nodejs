import express from 'express';
import { getJobCount } from '../controllers/dashboard.controller';

const dashboardroute=express.Router();



//Route to handle verifying user login
dashboardroute.get('/dashboard', getJobCount);

export default dashboardroute;