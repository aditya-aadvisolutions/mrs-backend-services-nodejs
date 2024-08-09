
import MrsDatabase from "../../infra/database/mrs_db_connection";

//import { UserEntity } from '../Entities/UserEntity';
import { User } from '../models/user';
import { QueryTypes } from 'sequelize';
import { generateRefreshToken, generateToken } from '../../utils/jwt';




export class LoginServices{

    async verifyLogin(username: string, password: string): Promise<{ data: User | null, isSuccess: boolean, message: string | null }> {
        try {
            const replacements = {
                Username: username,
                Password: password
            };
    
            const sqlQuery = `exec USP_VerifyLogin 
                @LoginName = :Username,
                @Password = :Password`;
    
            const [result] = await MrsDatabase.query(sqlQuery, {
                replacements: replacements,
                type: QueryTypes.RAW
            });
    
            const record = result[0];
            if (!record) {
                console.log("Invalid Username or Password");
                return {
                    data: null,
                    isSuccess: false,
                    message: "Invalid Username or Password"
                };
            }
    
            if (record.IsActive === false) {
                return {
                    data: null,
                    isSuccess: false,
                    message: "Account is inactive. Please contact the admin."
                };
            }
    
            let authClaims = {
                name: record.FirstName + ' ' + record.LastName,
                email: record.Email,
                role: record.RoleName,
                jti: new Date().getTime().toString()
            };
    
            const token = generateToken(authClaims);
            const refreshToken = generateRefreshToken();
            const expiration = process.env.JWT_EXPIRATION;
    
            const user: User = {
                id: record.Id,
                firstName: record.FirstName,
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
                expiration: new Date().getTime() + (60 * 60 * 1000) // example 1 hour expiration
            };
    
            return {
                data: user,
                isSuccess: true,
                message: null
            };
    
        } catch (error) {
            console.log(error);
            return {
                data: null,
                isSuccess: false,
                message: error.message
            };
        }
    }
    

    }

