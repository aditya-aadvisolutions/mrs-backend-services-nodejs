import express from 'express';
import { ClientController } from '../controllers/client.controller';

const clientRouter = express.Router();

const clientController = new ClientController();

console.info("inside clientcontroller");
clientRouter.get('/GetClients',clientController.getClients);
clientRouter.post('/register',clientController.createClient);

export default clientRouter;



