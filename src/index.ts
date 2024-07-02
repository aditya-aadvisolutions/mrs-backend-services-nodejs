var server = require('./api/server');
import MrsConfig from "./api/configuration/mrs_config";
import MrsDatabase from "./infra/database/mrs_db_connection";






MrsDatabase
    .authenticate()
    .then(()=>{
       console.log("Connection has been established successfully.");
    })
    .catch(err => {
       console.error("Unable to connect to the database:", err);
    })

    console.info('Starting server...');
    server.listen(MrsConfig.apiPort);
    console.info(`API started on port ${MrsConfig.apiPort}`);
    