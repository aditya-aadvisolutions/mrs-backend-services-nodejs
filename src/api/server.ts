
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
import employeerouter from "./routers/employee.route";
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
// app.use(cors());
// app.options()

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
const corsOptions = {
    origin: '*', //'http://localhost:5173/',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));

app.use('/api/Job', jobrouter)
app.use('/api/s3', multipartrouter);
app.use('/api/Upload', savejobrouter, adminfileupload)
app.use("/api/client", clientRouter);
app.use('/api/Lookup', statuslookup, userlookup)
app.use('/api', dashboardroute)
app.use('/api/Notification', notification)
app.use('/api/Login', userroute)
app.use('/api/employee',employeerouter)




module.exports = app;

