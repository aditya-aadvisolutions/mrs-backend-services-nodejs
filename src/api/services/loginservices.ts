
import MrsDatabase from "../../infra/database/mrs_db_connection";

//import { UserEntity } from '../Entities/UserEntity';
import { User } from '../models/user';
import { QueryTypes } from 'sequelize';
import { generateRefreshToken, generateToken } from '../../utils/jwt';




export class LoginServices{

    async verifyLogin(username: string, password: string): Promise<User | null> {
        try {
            const replacements={
                Username: username,
                Password: password
            }
            
            const sqlQuery= `exec USP_VerifyLogin 
            @LoginName = :Username,
            @Password = :Password `;

            
            const [result] = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW
            });
            const record=result[0];

            let authClaims;
            if(record){
                 authClaims={
                    name: record.FirstName +' '+ record.LastName,
                    email: record.Email,
                    role: record.RoleName,
                    jti: new Date().getTime().toString()
                };
            }
            const token = generateToken(authClaims);
        const refreshToken =generateRefreshToken();
        const expiration=process.env.JWT_EXPIRATION;
            
            if(result){ 
                const user: User | null = {
                id: record.Id,
                firstName: record.FIrstName,
                lastName: record.LastName,
                loginName: record.LoginName,
                password: null,
                phoneNo: record.PhoneNo,
                roleName: record.RoleName,
                email: record.Email,
                companyId: record.CompanyId,
                companyName: record.CompanyName,
                token: token,
                refreshToken: refreshToken,
                filePreferences: record.FilePreferences,
                expiration: new Date().getTime()+(60*60*1000)
                }
                return user;

            } else {
                 console.log("No Data found");
                 
            }
            
        } catch (error) {
            throw new Error(error.message)
            
        } 


    }

    }

