import { Request,Response } from "express";

import  EmployeeService  from "../services/employee.service";
import { Employee } from './../../domain/entities/employees';

export default class EmployeeController {

    employeeServices = new EmployeeService();

    constructor() {
        this.employeeServices = new EmployeeService();
    }

    createEmployee = async (req: Request, res: Response) => {
        const employeeDto = req.body;
        const result = await this.employeeServices.createEmployee(employeeDto);
        if(result){
            return res.status(201).json(result);
        }else{
            return res.status(500).json(result);
        }
    }

    getEmployees = async (req: Request, res: Response) => {
        const result = await this.employeeServices.getEmployees();
        if(result){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(result);
        }
    }



}