import { QueryTypes, Sequelize, literal } from "sequelize";
import { Employee } from "../../domain/entities/employees";
import MrsDatabase from "../../infra/database/mrs_db_connection";
import { employeeDto } from "../models/employee";
import { Logger } from "winston";
import { Users } from "../../domain/entities/user.entity";
import {Roles} from "../../domain/entities/Roles.entity";
import {UserRoles} from "../../domain/entities/UserRoles.entity";
import moment from 'moment';
import { encryptData } from "../configuration/auth";


export default class EmployeeService {
    log: Logger;

    constructor() {
        this.log = new Logger();
    }

    async createEmployee(employeeDto: employeeDto) {
        const dbtrans = await MrsDatabase.transaction();

        try {
            const hashedPassword = await encryptData(employeeDto.password);

            const companyId = literal(`'${employeeDto.companyId}'`);
            const createdBy = literal(`'${employeeDto.createdBy}'`);

            const RoleId = await Roles.findOne({ where: { Description: 'Employee' } });
            console.log(RoleId.dataValues, 'RoleId.dataValues.id')

            if (!RoleId) {
                throw new Error('Role not found');
            }
            
            const newUser = await Users.create({
                FirstName: employeeDto.firstName,
                LastName: employeeDto.lastName,
                LoginName: employeeDto.loginName,
                Password: hashedPassword, 
                Email: employeeDto.email,
                PhoneNo: employeeDto.phoneNo,
                CompanyId: companyId,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });

            const newEmployee = await Employee.create({
                UserId: newUser.dataValues.id,
                EmployeeType: 'employee',
                EmployeeName: employeeDto.loginName,
                Address1: employeeDto.address1,
                Address2: employeeDto.address2,
                State: employeeDto.state,
                Country: employeeDto.country,
                City: employeeDto.city,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });
            console.log(newUser.dataValues, 'newUser.dataValues.id')
            const newrole = await UserRoles.create({
                UserId: newUser.dataValues.id,
                RoleId: RoleId.dataValues.Id,
                CreatedBy: createdBy,
            }, { transaction: dbtrans });

            await dbtrans.commit();
            return {
                isSucess: true
            };
        } catch (error) {
            console.error(error);

            // Ensure rollback is handled properly on error
            if (dbtrans) {
                await dbtrans.rollback();
            }

            return {
                isSucess: false
            };
        }
    }
    async  getEmployees() {
        try {
            const results = await MrsDatabase.query("EXEC dbo.GetEmployeeDetails", {
                type: MrsDatabase.QueryTypes.SELECT
            });
            console.log('Results:', results);
            return results;
        } catch (err) { 
            console.error(err);
            throw err; // rethrow the error to handle it in the calling function
        }
    }
}
