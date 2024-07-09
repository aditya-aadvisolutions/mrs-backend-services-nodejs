import { DataTypes } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export const Roles = MrsDatabase.define('Roles', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    Description: {
        type: DataTypes.STRING
    },
    CompanyId: {
        type: DataTypes.UUID
    },
    Type: {
        type: DataTypes.STRING
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    CreatedBy: {
        type: DataTypes.STRING
    },
    ModifyedBy:{
        type: DataTypes.STRING
    },
    CreatedDateTime: {
        type: DataTypes.DATE
    },
    ModifiedDateTime: {
        type: DataTypes.DATE
    }
},{
    timestamps: false // Disable the automatic `createdAt` and `updatedAt` fields
});
