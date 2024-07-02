"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const sequelize_1 = require("sequelize");
const mrs_db_connection_1 = __importDefault(require("../../infra/database/mrs_db_connection"));
const { Sequelize } = require(`sequelize`);
const log = require("../../infra/logger");
class ClientService {
    constructor() {
    }
    // async updateStatus(jobId:string, userId:string,status:string){
    // }
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            // const userInfo = await client.fin
            let sql = `SELECT C.*, U.CompanyId, U.Email, U.FIrstName AS FirstName, U.LastName, U.Password, U.PhoneNo, U.Email, U.LoginName, R.[Description] AS [RoleName],
CMP.[Name] AS CompanyName
FROM Client C
JOIN [Users] U ON C.UserId = U.Id
JOIN [UserRoles] UR ON U.Id = UR.UserId 
JOIN [Roles] R ON UR.RoleId = R.Id
LEFT JOIN Company CMP ON R.CompanyId = CMP.Id`;
            log.warn("sql query is :" + sql);
            const userInfo = yield mrs_db_connection_1.default.query(sql, {
                type: sequelize_1.QueryTypes.SELECT
            });
            return userInfo;
        });
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map