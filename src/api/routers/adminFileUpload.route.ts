import express from 'express';
import { AdminFileUploadController } from '../controllers/adminFileUpload.controller';

const adminfileupload = express.Router();
const admin_controller = new AdminFileUploadController()

//Route to handle admin file upload
adminfileupload.post('/AdminFileUpload', admin_controller.AdminFileUpload)

export default adminfileupload;
