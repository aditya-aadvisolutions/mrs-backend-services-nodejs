const { createLogger, format, transports } = require("winston");
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ level: 'warn', filename: 'mrswarnlogs' }),
        new transports.File({ level: 'error', filename: 'mrserrorlogs' })
    ],
    format: format.combine(format.json(), format.timestamp(), format.metadata(), format.prettyPrint()),
    statusLevels: true
});
module.exports = logger;
//# sourceMappingURL=logger.js.map