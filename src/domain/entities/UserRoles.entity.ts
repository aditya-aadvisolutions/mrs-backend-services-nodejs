import { DataTypes, Sequelize } from "sequelize";
import MrsDatabase from "../../infra/database/mrs_db_connection";

export const UserRoles = MrsDatabase.define('UserRoles', {
    Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.UUID
    },
    RoleId: {
        type: DataTypes.UUID
    },
    CreatedBy: {
        type: DataTypes.STRING
    },
    ModifyedBy:{
        type: DataTypes.STRING
    },
    CreatedDateTime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('GETDATE()')
    },
    ModifiedDateTime: {
        type: DataTypes.DATE
    },

}, {
    timestamps: false // Disable the automatic `createdAt` and `updatedAt` fields
});

