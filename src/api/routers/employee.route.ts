import express from 'express';
import  EmployeeController  from '../controllers/employee.controller';

const employeerouter = express.Router();

const employee_controller = new EmployeeController();

//Route to handle fetching employee
employeerouter.post('/register', employee_controller.createEmployee);
employeerouter.get('/getemployees', employee_controller.getEmployees);
employeerouter.get('/employeedata', employee_controller.getIndividualEmployee);
employeerouter.patch('/update',employee_controller.updateEmployee)

export default employeerouter;
