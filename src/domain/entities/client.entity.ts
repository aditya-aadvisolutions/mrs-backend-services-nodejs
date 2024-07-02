import MrsDatabase from "../../infra/database/mrs_db_connection";
import Sequelize  from "sequelize";

export const client = MrsDatabase.define("Client",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    UserId:{
        type: Sequelize.STRING
    },
    ClientType:{
        type: Sequelize.STRING 
    },
    ClientName:{
        type: Sequelize.STRING
    },
    FirstName:{
        type: Sequelize.STRING
    },
    LastName:{
        type: Sequelize.STRING
    },
    LoginName:{
        type: Sequelize.STRING
    },
    Password:{
        type: Sequelize.STRING
    },
    PhoneNo:{
        type: Sequelize.STRING
    },
    Email:{
        type: Sequelize.STRING
    },
    RoleName:{
        type: Sequelize.STRING
    },
    CompanyId:{
        type: Sequelize.STRING
    },
    CompanyName:{
        type: Sequelize.STRING
    },
    Details:{
        type: Sequelize.STRING
    },
    Website:{
        type: Sequelize.STRING
    },
    Address1:{
        type: Sequelize.STRING
    },
    Address2:{
        type: Sequelize.STRING
    },
    City:{
        type: Sequelize.STRING
    },
    StateId:{
        type: Sequelize.STRING
    },
    CountryId:{
        type: Sequelize.STRING
    },
    DefaultTAT:{
        type: Sequelize.STRING
    },
    FilePreferencePDF:{
        type: Sequelize.BOOLEAN
    },
    FilePreferenceWord:{
        type: Sequelize.BOOLEAN
    },
    FilePreferencePDFLink:{
        type: Sequelize.BOOLEAN
    },
    ClientLogo:{
        type: Sequelize.STRING
    },
    IsDeleted:{
        type: Sequelize.BOOLEAN
    },
    CreatedBy:{
        type: Sequelize.STRING
    },
    ModifyedBy:{
        type: Sequelize.STRING
    },
    CreatedDateTime:{
        type: Sequelize.DATE
    },
    ModifiedDateTime:{
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
    },
    FilePreference:{
        type: Sequelize.STRING
    }
   

},
    {
        
            freezeTableName: true,
        
    }
)
