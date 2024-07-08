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
import jobrouter from "./routers";
import userlookup from "./routers/userlookup.route";

const winstonExpress = require("express-winston");

var app = express();



var corsOptions = {
    origin: MrsConfig.cors.allowedOrigins,
    methods: MrsConfig.cors.allowedMethods,
    preflightContinue: false,
    optionsSuccessStatus: 204
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const upload = multer();
app.use(upload.none());
app.use(cors(corsOptions));
app.use('/api', jobrouter)
app.use('/api/s3', multipartrouter);
app.use('/api/Upload', savejobrouter, adminfileupload)
app.use("/client", clientRouter);
app.use('/api/Lookup', statuslookup, userlookup)

module.exports = app;

