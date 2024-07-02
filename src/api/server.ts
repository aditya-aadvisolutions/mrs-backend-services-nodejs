import express,{ Application } from "express";
import cors, { CorsOptions } from "cors";
import MrsConfig from "./configuration/mrs_config";
import clientRouter from "./routers/client.route";
import { transports,format } from "winston";

const winstonExpress = require("express-winston");

var app = express();



var corsOptions = {

    origin: MrsConfig.cors.allowedOrigins,
    methods: MrsConfig.cors.allowedMethods,
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

app.use("/client",clientRouter);

module.exports = app;

