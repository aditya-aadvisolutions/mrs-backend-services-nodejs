import express from 'express';
import { UserLookupController } from '../controllers/userlookup.controller';

const userlookup = express.Router();

//Route to handle the status lookup
userlookup.get('/getuserlookup', UserLookupController)

export default userlookup;
