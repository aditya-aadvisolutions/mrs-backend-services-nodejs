import { ApplicationConfig } from "./application_config";
import * as dotenv from "dotenv";

dotenv.config();

const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    apiPort: parseInt(process.env.API_PORT),
    cors: {
        allowedOrigins: "*",
        allowedMethods: "*"
    },
    loggingConfig: {
        enabled: true,
        level: parseInt(process.env.LOG_LEVEL || `0`),
        type: 'appinsightswithconsole',
        api_key: process.env.APPINSIGHT_KEY as string
    }
    
}

module.exports = config;