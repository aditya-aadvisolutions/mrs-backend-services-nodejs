"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment = process.env.NODE_ENV || 'developement';
const MrsConfig = require('./configuration.development');
MrsConfig.dbConfig = {
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_UNAME,
    password: process.env.DB_PWD
};
Object.freeze(MrsConfig);
exports.default = MrsConfig;
//# sourceMappingURL=mrs_config.js.map