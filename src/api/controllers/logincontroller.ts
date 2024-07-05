import {Request, Response, Router} from 'express'
import { LoginServices } from '../services/loginservices';

import { ApiResult } from '../models/apiResult';
import jwt, {JwtPayLoad, Secret} from 'jsonwebtoken';
import crypto from 'crypto';
import {User} from '../models/user';
import AesEncryption from '../../utils/aesencryption'



const loginService= new LoginServices();

export const verifyLogin=async (req: Request, res: Response) =>{
    const {username, password}=req.body;

   // const encryptedPassword= AesEncryption.encrypt(password);
    

   try{
     const userInfo: any= await loginService.verifyLogin(username, password);
     //console.log(encryptedPassword,"EncryptedPassword")

        const result: ApiResult<any[]>={
            data: userInfo ,
            isSuccess: true,
            message: null
        }

     res.json(result)

    }
catch(error){
    const result: ApiResult<any>={
        data: null,
        isSuccess: false,
        message: error.message

    }
    res.status(500).json(result); 
}

}
/*
const JWT_SECRET:Secret=process.env.JWT_SECRET;
const JWT_ISSUER=process.env.JWT_ISSUER;
const JWT_AUDIENCE=process.env.JWT_AUDIENCE;
const TOKEN_VALIDITY_IN_MINUTES= parseInt(process.env.TOKEN_VALIDITY_IN_MINUTES);

export const refreshToken= async(req: Request, res: Response) =>{
    const {accessToken, refreshToken}= req.body;
    console.log("Started")
    if(!accessToken || !refreshToken){
        return res.status(400).json({error: 'Invalid client request'});
    }
 console.log("Passes Token")

 //Validate access token and get principal

 const principal = getPrincipalFromExpiredToken(accessToken);
 if(!principal){
    return res.status(400).json({error: 'Invalid access token or refesh token'});
 }
 const username=principal.identity.name;

const user: LoginUsers = {
    LoginName: 'test',
    Password: 'pass',
    Refreshtoken: refreshToken
}

if(!user || user.Refreshtoken !== refreshToken){
    return res.status(400).json({error: 'Invalid access token or refresh token'})
}

const newAccessToken= createToken(principal.claims);
const newRefreshToken=generateRefreshToken();

user.Refreshtoken=newRefreshToken;
return res.json({
    accessToken: jwt.sign(newAccessToken, JWT_SECRET),
    refreshToken: newRefreshToken
})

}
export const createToken=(authClaims:object): string =>{
    const token=jwt.sign(authClaims, JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        expiresIn: `${TOKEN_VALIDITY_IN_MINUTES}m`
    });

    return token;
}
*/

// export const generateRefreshToken = (): string =>{
//     return crypto.randomBytes(64).toString('base64');
// }
/*
export const getPrincipalFromExpiredToken = (token:string): JwtPayLoad | null =>{
    
        const tokenValidateParameters: jwt.VerifyOptions = {
            audience: JWT_AUDIENCE,
            issuer: JWT_ISSUER,
            ignoreExpiration: false,
            secret: JWT_SECRET
        };
    try {
        const decode =jwt.verify(token, JWT_SECRET, {ignoreExpiration: true}) as JwtPayLoad;
        return decode;
        
    } catch (error) {
        return null
    }
}
    */
