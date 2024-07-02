
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

}