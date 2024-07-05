import { getJobCount } from "../controllers/dashboard.controller";

const app=require ('express').Router();
app.get('/dashboard',getJobCount)

export default app;