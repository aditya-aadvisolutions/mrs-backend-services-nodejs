
import { Request,Response } from "express";
import { clientDto } from "../models/client";
import MrsConfig from "../configuration/mrs_config";
import { Where } from "sequelize/types/utils";
import { ClientService } from "../services/client.service";

export class ClientController{
    
    clientService:ClientService;
    constructor(){
        
        this.clientService=new ClientService();
    }

    getClients = async (req,res,next)=>{
        const clients = await this.clientService.getClients();
        if (clients) {
            return res.json(clients);
          } else {
            res.statusMessage = "Unable to pull users list";
            res.status(404).end();
          }
    }

    getInvidualClient = async (req:Request,res:Response)=>{
        const userId = req.query.userId;
        console.log(userId,"userId")

        const client = await this.clientService.getInvidualClient(userId as any);
        if (client) {
            return res.json(client);
          } else {
            res.statusMessage = "Unable to pull users list";
            res.status(404).end();
          }
    }

    updateClient = async (req:Request,res:Response)=>{
        const clientDto = req.body;

        const client = await this.clientService.updateClient(clientDto);
        if (client.isSucess == true) {
          res.status(200).json(client);
          res.statusMessage = "client updated";
          } else {
            res.statusMessage = "Unable to update client";
            res.status(404).json(client);
         }
    }
    createClient = async (req:Request,res:Response)=>{
        const clientDto = req.body;
        console.log(clientDto,"body")
         const client = await this.clientService.createClient(clientDto);
        if (client.isSucess == true) {
          res.status(200).json(client);
          res.statusMessage = "client created";
          } else {
            res.statusMessage = "Unable to register client";
            res.status(404).json(client);
         }
    }

}