"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogProvider = void 0;
const console_logger_1 = require("./console_logger");
const mrs_config_1 = __importDefault(require("../../api/configuration/mrs_config"));
const application_insights_logger_1 = require("./application_insights_logger");
class LogProvider {
    constructor() {
        this.logConfig = mrs_config_1.default.loggingConfig;
    }
    getLogger() {
        const loggerType = this.logConfig.type;
        switch (loggerType) {
            case 'console':
                return new console_logger_1.ConsoleLogger();
            case 'appinsights':
                return new application_insights_logger_1.ApplicationInsightsLogger();
            case 'appinsightswithconsole':
                return new application_insights_logger_1.ApplicationInsightsLogger(true);
            default:
                break;
        }
        console.error('Invalid Logger');
    }
}
exports.LogProvider = LogProvider;
//# sourceMappingURL=log_provider.js.map