
import { DataTypes, Sequelize } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export const Users = MrsDatabase.define('Users', {
  id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
  FirstName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  LastName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  LoginName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  Password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  Email: {
      type: DataTypes.STRING,
      allowNull: false
  },
  PhoneNo: {
      type: DataTypes.BIGINT,
      allowNull: false
  },
  CompanyId: {
      type: DataTypes.UUID,
      allowNull: false
  },
  IsDisabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
  IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
  CreatedBy: {
      type: DataTypes.UUID,
      allowNull: false
  },
  CreatedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('GETDATE()')
  }
}, {
  timestamps: false // Disable the automatic `createdAt` and `updatedAt` fields
});;
