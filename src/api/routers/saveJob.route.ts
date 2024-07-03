import express from 'express';
import { SaveJobController } from '../controllers/saveJob.controller';

const savejobrouter = express.Router();

//Route to handle save Job
savejobrouter.post('/SaveJob', SaveJobController)

export default savejobrouter;
