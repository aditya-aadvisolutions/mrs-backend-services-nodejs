import { DataTypes, Sequelize } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";
import { Users } from "./user.entity";

export const Employee = MrsDatabase.define('Employees', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.STRING,
      },
      EmployeeName: {
        type: DataTypes.STRING,
      },
      EmployeeType: {
        type: DataTypes.STRING,
      },
      Address1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Address2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      City: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      State: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EmployeeLogo: {
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      CreatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ModifyedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CreatedDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('GETDATE()')
      },
      ModifiedDateTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Manager:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      Role:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
     
}, {
    tableName: 'Employees',
    timestamps: false // Disable the automatic `createdAt` and `updatedAt` fields
  });

  Employee.belongsTo(Users, {
    foreignKey: 'UserId',
    targetKey: 'id',
   // as: 'Users' // Alias for inclusion
});
