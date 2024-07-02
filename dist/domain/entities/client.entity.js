"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const mrs_db_connection_1 = __importDefault(require("../../infra/database/mrs_db_connection"));
const sequelize_1 = __importDefault(require("sequelize"));
exports.client = mrs_db_connection_1.default.define("Client", {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId: {
        type: sequelize_1.default.STRING
    },
    ClientType: {
        type: sequelize_1.default.STRING
    },
    ClientName: {
        type: sequelize_1.default.STRING
    },
    FirstName: {
        type: sequelize_1.default.STRING
    },
    LastName: {
        type: sequelize_1.default.STRING
    },
    LoginName: {
        type: sequelize_1.default.STRING
    },
    Password: {
        type: sequelize_1.default.STRING
    },
    PhoneNo: {
        type: sequelize_1.default.STRING
    },
    Email: {
        type: sequelize_1.default.STRING
    },
    RoleName: {
        type: sequelize_1.default.STRING
    },
    CompanyId: {
        type: sequelize_1.default.STRING
    },
    CompanyName: {
        type: sequelize_1.default.STRING
    },
    Details: {
        type: sequelize_1.default.STRING
    },
    Website: {
        type: sequelize_1.default.STRING
    },
    Address1: {
        type: sequelize_1.default.STRING
    },
    Address2: {
        type: sequelize_1.default.STRING
    },
    City: {
        type: sequelize_1.default.STRING
    },
    StateId: {
        type: sequelize_1.default.STRING
    },
    CountryId: {
        type: sequelize_1.default.STRING
    },
    DefaultTAT: {
        type: sequelize_1.default.STRING
    },
    FilePreferencePDF: {
        type: sequelize_1.default.BOOLEAN
    },
    FilePreferenceWord: {
        type: sequelize_1.default.BOOLEAN
    },
    FilePreferencePDFLink: {
        type: sequelize_1.default.BOOLEAN
    },
    ClientLogo: {
        type: sequelize_1.default.STRING
    },
    IsDeleted: {
        type: sequelize_1.default.BOOLEAN
    },
    CreatedBy: {
        type: sequelize_1.default.STRING
    },
    ModifyedBy: {
        type: sequelize_1.default.STRING
    },
    CreatedDateTime: {
        type: sequelize_1.default.DATE
    },
    ModifiedDateTime: {
        type: sequelize_1.default.DATE,
        allowNull: true,
        defaultValue: sequelize_1.default.NOW,
    },
    FilePreference: {
        type: sequelize_1.default.STRING
    }
}, {
    freezeTableName: true,
});
//# sourceMappingURL=client.entity.js.map