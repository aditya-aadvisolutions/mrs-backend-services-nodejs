import express from 'express';
import { SaveJobController } from '../controllers/saveJob.controller';

const savejobrouter = express.Router();

const save_job_controller = new SaveJobController()

//Route to handle save Job
savejobrouter.post('/SaveJob', save_job_controller.SaveJob)
savejobrouter.patch('/UpdatePageCount', save_job_controller.UpdatePageCount)

export default savejobrouter;
