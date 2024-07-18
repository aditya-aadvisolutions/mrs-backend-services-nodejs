
import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import MrsConfig from "./configuration/mrs_config";
import clientRouter from "./routers/client.route";
import { transports, format } from "winston";
import multipartrouter from "./routers/multipartroute";
import bodyParser from "body-parser";
import multer from 'multer';
import savejobrouter from "./routers/saveJob.route";
import adminfileupload from "./routers/adminFileUpload.route";
import statuslookup from "./routers/statuslookup.route";
import jobrouter from "./routers/jobs.route";
import userlookup from "./routers/userlookup.route";
import notification from "./routers/notification.route";
import userroute from "./routers/users.route";
import dashboardroute from "./routers/dashboard.route";

const winstonExpress = require("express-winston");
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));
// var corsOptions = {
//     origin: MrsConfig.cors.allowedOrigins,
//     //origin: '*',
//     methods: MrsConfig.cors.allowedMethods,
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// }
const upload = multer();
app.use(upload.none());
app.use(cors());

app.use('/api/Job', jobrouter)
app.use('/api/s3', multipartrouter);
app.use('/api/Upload', savejobrouter, adminfileupload)
app.use("/api/client", clientRouter);
app.use('/api/Lookup', statuslookup, userlookup)
app.use('/api', dashboardroute)
app.use('/api/Notification', notification)
app.use('/api/Login', userroute)




module.exports = app;

