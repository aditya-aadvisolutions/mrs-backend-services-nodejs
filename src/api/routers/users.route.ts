import express from 'express';
import { verifyLogin } from '../controllers/logincontroller';

const userroute=express.Router();



//Route to handle verifying user login
userroute.post('/verifylogin', verifyLogin);

export default userroute;
