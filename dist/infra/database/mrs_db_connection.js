"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrs_config_1 = __importDefault(require("../../api/configuration/mrs_config"));
const Sequelize = require("sequelize");
const dbConfig = mrs_config_1.default.dbConfig;
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
const MrsDatabase = new Sequelize(dbConfig.dbName, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: "mssql",
    logging: false,
    "ssl": true,
    "dialectOptions": {
        "ssl": {
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
console.info('created database connection at ' + Date.now().toLocaleString());
exports.default = MrsDatabase;
//# sourceMappingURL=mrs_db_connection.js.map