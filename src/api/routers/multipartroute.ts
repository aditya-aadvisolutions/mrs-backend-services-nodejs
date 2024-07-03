import express from 'express';
import { StatusLookupController } from '../controllers/statuslookup.controller';
import { MultipartController } from '../controllers/multipart.controller';

const multipartrouter = express.Router();


//Route to handle the status lookup
multipartrouter.get('/Lookup/getStatusLookup', StatusLookupController)

//Route to handle multipart
multipartrouter.post('/multipart', MultipartController)



export default multipartrouter;
