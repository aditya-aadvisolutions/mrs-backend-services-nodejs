import express from 'express';
import { MultipartController } from '../controllers/multipart.controller';

const multipartrouter = express.Router();

//Route to handle multipart
multipartrouter.post('/multipart', MultipartController)

export default multipartrouter;
