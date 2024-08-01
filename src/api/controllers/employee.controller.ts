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

    getIndividualEmployee = async (req: Request, res: Response) => {
        const userId = req.query.userId;
        const result = await this.employeeServices.getEmployeeDetails(userId);
        if(result){
            return res.status(200).json(result);
        }else{
            return res.status(500).json(result);
        }
    }

    updateEmployee = async (req:Request,res:Response) =>{
        const employeeDto = req.body;

        const employee = await this.employeeServices.updateEmployee(employeeDto);
        if(employee.isSucess === true){
             res.statusMessage = " employee update"
            res.status(200).json(employee)
        } else {
            res.statusMessage = "Unable to update employee";
            res.status(404).json(employee);
        }
    }

}