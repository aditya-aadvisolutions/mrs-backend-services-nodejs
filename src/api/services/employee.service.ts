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
                Role: employeeDto.role,
                Manager:employeeDto.manager
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
    async  updateEmployee(employeeDto: employeeDto) {
        const dbtrans = await MrsDatabase.transaction();
        try {
            const modifyedBy = literal(`'${employeeDto.modifyedBy}'`);
            const userUpdateData = {
                FirstName: employeeDto.firstName,
                LastName: employeeDto.lastName,
                Email: employeeDto.email,
                LoginName: employeeDto.loginName,
                PhoneNo: employeeDto.phoneNo,
                ModifiedBy: modifyedBy,
                IsActive: employeeDto.isActive,
            }

            const employeeUpdateData = {
                EmployeeName: employeeDto.loginName,
                Address1: employeeDto.address1,
                Address2: employeeDto.address2,
                State: employeeDto.state,
                Country: employeeDto.country,
                City: employeeDto.city,
                ModifiedBy: modifyedBy,
                IsActive: employeeDto.isActive,
                Manager:employeeDto.manager,
                Role:employeeDto.role
            }
           
            await Users.update(userUpdateData, {
                where: { Id: employeeDto.userId },
                transaction: dbtrans
            })
            await Employee.update(employeeUpdateData, {
                where: { UserId: employeeDto.userId },
                transaction: dbtrans
            })
            await dbtrans.commit();
            return {
                isSucess: true
            };
        } catch (error) {
            console.error(error); 
            if (dbtrans) {
                await dbtrans.rollback();
            }

            return {
                isSucess: false
            };
        }
    }
    async  getEmployeeDetails(id: any) {
        try {
            const results = await Employee.findOne({
                where: { UserId: id },  // Use where to filter by UserId
                include: [Users] 
            })
            console.log('Results:', results);
            return results;
        } catch (err) { 
            console.error(err);
            throw err; // rethrow the error to handle it in the calling function
        }
    }
    
}

