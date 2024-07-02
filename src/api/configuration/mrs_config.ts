import { Application } from "express";
import { ApplicationConfig } from "./application_config";


const environment = process.env.NODE_ENV || 'developement';

const MrsConfig: ApplicationConfig = require('./configuration.development');

MrsConfig.dbConfig={

    dbName: process.env.DB_NAME as string,
    host:process.env.DB_HOST as string,
    username:process.env.DB_UNAME as string,
    password:process.env.DB_PWD as string

}

Object.freeze(MrsConfig);

export default MrsConfig;
