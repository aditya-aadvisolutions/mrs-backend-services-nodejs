import { DataTypes, Sequelize } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export const client = MrsDatabase.define("Client", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.STRING,
  },
  ClientType: {
    type: DataTypes.STRING,
  },
  ClientName: {
    type: DataTypes.STRING,
  },
  Details: {
    type: DataTypes.STRING,
  },
  Website: {
    type: DataTypes.STRING,
  },
  Address1: {
    type: DataTypes.STRING,
  },
  Address2: {
    type: DataTypes.STRING,
  },
  City: {
    type: DataTypes.STRING,
  },
  StateId: {
    type: DataTypes.STRING,
  },
  CountryId: {
    type: DataTypes.STRING,
  },
  DefaultTAT: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
  FilePreferencePDF: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  FilePreferenceWord: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  FilePreferencePDFLink: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  ClientLogo: {
    type: DataTypes.STRING,
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  FilePreference: {
    type: DataTypes.STRING,
  },
}, {
    tableName: 'Client',
    timestamps: false // Disable the automatic `createdAt` and `updatedAt` fields
  });
