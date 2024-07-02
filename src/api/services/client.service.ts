import { QueryTypes,where } from "sequelize";
import { client } from "../../domain/entities/client.entity";
import MrsDatabase from "../../infra/database/mrs_db_connection";

const {Sequelize} = require(`sequelize`)


const log = require("../../infra/logger");

export class ClientService{
    

    constructor(){
        

    }

    // async updateStatus(jobId:string, userId:string,status:string){

        

    // }

    async getClients(){

        // const userInfo = await client.fin

        let sql= `SELECT C.*, U.CompanyId, U.Email, U.FIrstName AS FirstName, U.LastName, U.Password, U.PhoneNo, U.Email, U.LoginName, R.[Description] AS [RoleName],
CMP.[Name] AS CompanyName
FROM Client C
JOIN [Users] U ON C.UserId = U.Id
JOIN [UserRoles] UR ON U.Id = UR.UserId 
JOIN [Roles] R ON UR.RoleId = R.Id
LEFT JOIN Company CMP ON R.CompanyId = CMP.Id`;

log.warn("sql query is :" +sql);

        const userInfo = await MrsDatabase.query(sql,{
            type: QueryTypes.SELECT
        })

        return userInfo;

    }
}