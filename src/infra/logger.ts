const {createLogger, format,transports} = require("winston");

 export  const logger = createLogger({
    transports:[
        new transports.Console(),
        new transports.File({level: 'warn', filename:'mrswarnlogs'}),
        new transports.File({level: 'error', filename:'mrserrorlogs'}),
        new transports.File({level: 'info', filename:'mrsinfologs'})
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.metadata(),
        format.prettyPrint()

    ),
    statusLevels:true
})

//module.exports={logger};