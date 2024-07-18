import express from 'express';
import { verifyLogin } from '../controllers/logincontroller';

const userroute=express.Router();

userroute.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });

//Route to handle verifying user login
userroute.post('/verifylogin', verifyLogin);

export default userroute;
