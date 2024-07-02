import { DataTypes } from "sequelize";
import MrsConfig from "../../api/configuration/mrs_config";
import { DbConfig } from "../../api/configuration/application_config";
import { Pool } from "mysql2/typings/mysql/lib/Pool";

import sql, {ConnectionPool} from "mssql";

const Sequelize =  require("sequelize");

const dbConfig: DbConfig = MrsConfig.dbConfig;

// const MrsDatabase: sql.config = {
//     erver: 'maxtran.database.windows.net',
//   authentication: {
//     type: 'default',
//     options: {
//       userName: 'maxtran-dev',
//       password: '$Admin@123',
//     },
//   },
//   database: 'maxtran_dev',
//   options: {
//     encrypt: true, // Use encryption (if applicable)
//     trustServerCertificate: true, // For self-signed certificates
//   },
// }

const MrsDatabase = new Sequelize(dbConfig.dbName,dbConfig.username,dbConfig.password, {

    host:dbConfig.host,
    dialect: "mssql",
    logging:false,
    "ssl": true,
    "dialectOptions":{
        "ssl":{
            "rejectUnauthorized": false,
            "require": true
        }
   },
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000   
    }
});



console.info('created database connection at '+Date.now().toLocaleString());

export default MrsDatabase;