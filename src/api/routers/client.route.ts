import express from 'express';
import { ClientController } from '../controllers/client.controller';

var clientRouter = express.Router();

const clientController = new ClientController();

console.info("inside clientcontroller");
clientRouter.get('/get',clientController.getClients);
clientRouter.post('/register',clientController.createClient);

export default clientRouter;



