import express from 'express';
import { StatusLookupController } from '../controllers/statuslookup.controller';

const statuslookup = express.Router();

//Route to handle the status lookup
statuslookup.get('/getstatuslookup', StatusLookupController)

export default statuslookup;
