import { QueryTypes, literal } from "sequelize";
import { client } from "../../domain/entities/client.entity";
import MrsDatabase from "../../infra/database/mrs_db_connection";
import { clientDto, updateClientDto } from "../models/client";
import { Logger } from "winston";
import { Users } from "../../domain/entities/user.entity";
import {Roles} from "../../domain/entities/Roles.entity";
import {UserRoles} from "../../domain/entities/UserRoles.entity";
import moment from 'moment';
import { encryptData } from "../configuration/auth";

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
            const hashedPassword = await encryptData(clientDto.password);
            let FilePreferencePDF = false;
            let FilePreferenceWord = false;
            let FilePreferencePDFLink = false;
            if (clientDto.filePreference.includes('.pdf')) {
                FilePreferencePDF = true;
            }
            if (clientDto.filePreference.includes('.docx')) {
                FilePreferenceWord = true;
            }
            if (clientDto.filePreference.includes('.pdflnk')) {
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
                LoginName: clientDto.loginName,
                Password: hashedPassword, 
                Email: clientDto.email,
                PhoneNo: clientDto.phoneNo,
                CompanyId: companyId,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });

            const newClient = await client.create({
                UserId: newUser.dataValues.id,
                ClientType: 'client',
                ClientName: clientDto.loginName,
                Details: 'details',
                Address1: clientDto.address1,
                Address2: clientDto.address2,
                State: clientDto.state,
                Country: clientDto.country,
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

    


    async updateClient(clientDto: updateClientDto) {
        const dbtrans = await MrsDatabase.transaction();

        try {
            let FilePreferencePDF = false;
            let FilePreferenceWord = false;
            let FilePreferencePDFLink = false;
            if (clientDto.filePreference.includes('.pdf')) {
                FilePreferencePDF = true;
            }
            if (clientDto.filePreference.includes('.docx')) {
                FilePreferenceWord = true;
            }
            if (clientDto.filePreference.includes('.pdflnk')) {
                FilePreferencePDFLink = true;
            }
             const modifyedBy = literal(`'${clientDto.modifyedBy}'`);

            const userUpdateData = {
                FirstName: clientDto.firstName,
                LastName: clientDto.lastName,
                LoginName: clientDto.loginName,
                Email: clientDto.email,
                PhoneNo: clientDto.phoneNo,
                IsActive: clientDto.isActive,
            };

            const clientUpdateData = {
                ClientName: clientDto.loginName,
                Address1: clientDto.address1,
                Address2: clientDto.address2,
                State: clientDto.state,
                Country: clientDto.country,
                City: clientDto.city,
                ModifyedBy: modifyedBy || null,
                FilePreferencePDF: FilePreferencePDF,
                FilePreferenceWord: FilePreferenceWord,
                FilePreferencePDFLink: FilePreferencePDFLink,
                FilePreference: clientDto.filePreference.toString(),
                IsActive: clientDto.isActive,
            };

            await Users.update(userUpdateData, { where: { Id: clientDto.userId }, transaction: dbtrans });
            await client.update(clientUpdateData, { where: { UserId: clientDto.userId }, transaction: dbtrans });

            await dbtrans.commit();
            return {
                isSucess: true
            };
        } catch (error) {
            console.error(error);

            if (dbtrans) {
                await dbtrans.rollback();
            }

            return {
                isSucess: false
            };
        }
    }

    
     async getInvidualClient (userId: string) {
        try{
            const clientdata = await client.findOne({
                where: { UserId: userId },  // Use where to filter by UserId
                include: [Users]  // Include associated Users
            });
            return clientdata;
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
      
    }
}
