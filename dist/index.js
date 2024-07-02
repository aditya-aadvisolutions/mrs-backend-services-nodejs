"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server = require('./api/server');
const mrs_config_1 = __importDefault(require("./api/configuration/mrs_config"));
const mrs_db_connection_1 = __importDefault(require("./infra/database/mrs_db_connection"));
mrs_db_connection_1.default
    .authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch(err => {
    console.error("Unable to connect to the database:", err);
});
console.info('Starting server...');
server.listen(mrs_config_1.default.apiPort);
console.info(`API started on port ${mrs_config_1.default.apiPort}`);
//# sourceMappingURL=index.js.map