// import express,{ Application, urlencoded } from "express";
import express from 'express'
import cors, { CorsOptions } from "cors";
import MrsConfig from "./configuration/mrs_config";
import clientRouter from "./routers/client.route";
import { transports,format } from "winston";
import router from "./routers";
import bodyParser from 'body-parser'

const winstonExpress = require("express-winston");
import router from './routers/dashboard.route'




const app=express();

app.use(bodyParser.json());



app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));



var corsOptions = {

    origin: MrsConfig.cors.allowedOrigins,
    methods: MrsConfig.cors.allowedMethods,
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

app.use("/api",router);


module.exports = app;

