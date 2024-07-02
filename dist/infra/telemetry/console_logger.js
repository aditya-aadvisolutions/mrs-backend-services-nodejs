"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const mrs_config_1 = __importDefault(require("../../api/configuration/mrs_config"));
class ConsoleLogger {
    constructor() {
        this.debug = (message, properties) => {
            if (!this.logConfig.enabled || this.logConfig.level > 0)
                return;
            console.log(message);
            if (properties) {
                console.table(properties);
            }
        };
        this.info = (message, properties) => {
            if (!this.logConfig.enabled || this.logConfig.level > 1)
                return;
            console.log(message);
            if (properties) {
                console.table(properties);
            }
        };
        this.event = (eventName, eventProperties) => {
            if (!this.logConfig.enabled)
                return;
            console.log(eventName);
            if (eventProperties) {
                console.table(eventProperties);
            }
        };
        this.error = (exception) => {
            if (!this.logConfig.enabled)
                return;
            console.error(exception);
        };
        this.logConfig = mrs_config_1.default.loggingConfig;
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=console_logger.js.map