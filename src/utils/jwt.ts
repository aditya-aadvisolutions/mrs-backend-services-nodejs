import jwt from 'jsonwebtoken';

export const generateToken = (payload: any)=>{
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {expiresIn: process.env.JWT_EXPIRATION || '1h'});

}

export const generateRefreshToken = ()=>{
 return jwt.sign({}, process.env.JWT_SECRET || 'secret', {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION||'7d'}); 
}