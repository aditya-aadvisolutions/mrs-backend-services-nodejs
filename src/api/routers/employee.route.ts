import express from 'express';
import  EmployeeController  from '../controllers/employee.controller';

const employeerouter = express.Router();

const employee_controller = new EmployeeController();

//Route to handle fetching employee
employeerouter.post('/register', employee_controller.createEmployee);
employeerouter.get('/getemployees', employee_controller.getEmployees);

export default employeerouter;
