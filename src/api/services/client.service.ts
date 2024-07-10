import { QueryTypes, literal } from "sequelize";
import { client } from "../../domain/entities/client.entity";
import MrsDatabase from "../../infra/database/mrs_db_connection";
import { clientDto } from "../models/client";
import { Logger } from "winston";
import { Users } from "../../domain/entities/user.entity";
import {Roles} from "../../domain/entities/Roles.entity";
import {UserRoles} from "../../domain/entities/UserRoles.entity";
import bcrypt from 'bcrypt';
import moment from 'moment';


export class ClientService {
    log: Logger;

    constructor() {
        this.log = new Logger();
    }

    async getClients() {
        let sql = `SELECT C.*, U.CompanyId, U.Email, U.FIrstName AS FirstName, U.LastName, U.Password, U.PhoneNo, U.Email, U.LoginName, R.[Description] AS [RoleName],
        CMP.[Name] AS CompanyName
        FROM Client C
        JOIN [Users] U ON C.UserId = U.Id
        JOIN [UserRoles] UR ON U.Id = UR.UserId 
        JOIN [Roles] R ON UR.RoleId = R.Id
        LEFT JOIN Company CMP ON R.CompanyId = CMP.Id`;

        const userInfo = await MrsDatabase.query(sql, {
            type: QueryTypes.SELECT
        });

        return userInfo;
    }

    async createClient(clientDto: clientDto) {
        const dbtrans = await MrsDatabase.transaction();

        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(clientDto.password, saltRounds);
            let FilePreferencePDF = false;
            let FilePreferenceWord = false;
            let FilePreferencePDFLink = false;
            if (clientDto.filePreference.includes('pdf')) {
                FilePreferencePDF = true;
            }
            if (clientDto.filePreference.includes('doc')) {
                FilePreferenceWord = true;
            }
            if (clientDto.filePreference.includes('link')) {
                FilePreferencePDFLink = true;
            }
            const companyId = literal(`'${clientDto.companyId}'`);
            const createdBy = literal(`'${clientDto.createdBy}'`);

            const createdDateTime = moment().toDate(); // Pass Date object
            const RoleId = await Roles.findOne({ where: { Description: 'Client' } });
            console.log(RoleId.dataValues, 'RoleId.dataValues.id')

            if (!RoleId) {
                throw new Error('Role not found');
            }
            
            const newUser = await Users.create({
                FirstName: clientDto.firstName,
                LastName: clientDto.lastName,
                LoginName: clientDto.firstName,
                Password: hashedPassword, 
                Email: clientDto.email,
                PhoneNo: clientDto.phoneNo,
                CompanyId: companyId,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });

            const newClient = await client.create({
                UserId: newUser.dataValues.id,
                ClientType: 'client',
                ClientName: clientDto.firstName,
                Details: 'details',
                Address1: clientDto.address1,
                Address2: clientDto.address2,
                City: clientDto.city,
                CreatedBy: createdBy,
                FilePreferencePDF: FilePreferencePDF,
                FilePreferenceWord: FilePreferenceWord,
                FilePreferencePDFLink: FilePreferencePDFLink,
                FilePreference:  clientDto.filePreference.toString(),
            }, { transaction: dbtrans });
            console.log(newUser.dataValues, 'newUser.dataValues.id')
            const newrole = await UserRoles.create({
                UserId: newUser.dataValues.id,
                RoleId: RoleId.dataValues.Id,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });

            await dbtrans.commit();
            return {
                isSucess: true
            };
        } catch (error) {
            console.error(error);

            // Ensure rollback is handled properly on error
            if (dbtrans) {
                await dbtrans.rollback();
            }

            return {
                isSucess: false
            };
        }
    }
}
