import { DataTypes } from 'sequelize';
import MrsDatabase from '../../infra/database/mrs_db_connection';
const Company = MrsDatabase.define('Company', {
  Id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Url: {
    type: DataTypes.STRING
  },
  SmallLogo: {
    type: DataTypes.STRING
  },
  LoginLogo: {
    type: DataTypes.STRING
  },
  HeaderTitle: {
    type: DataTypes.STRING
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  CreatedBy: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ModifyedBy: {
    type: DataTypes.UUID
  },
  CreatedDateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ModifiedDateTime: {
    type: DataTypes.DATE
  }
});

export default Company;
