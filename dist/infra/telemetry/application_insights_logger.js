"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationInsightsLogger = void 0;
const mrs_config_1 = __importDefault(require("../../api/configuration/mrs_config"));
let appInsights = require("applicationinsights");
class ApplicationInsightsLogger {
    constructor(consoleLogEnabled = false) {
        this.debug = (message, properties) => {
            if (!this.logConfig.enabled || this.logConfig.level > 0)
                return;
            if (this.consoleLogEnabled) {
                console.log(message);
                if (properties) {
                    console.table(properties);
                }
            }
            this.appInsightsClient.trackTrace({ message, severity: 0 });
        };
        this.info = (message, properties) => {
            if (!this.logConfig.enabled || this.logConfig.level > 1)
                return;
            if (this.consoleLogEnabled) {
                console.log(message);
                if (properties) {
                    console.table(properties);
                }
            }
            this.appInsightsClient.trackTrace({ message, severity: 1 });
        };
        this.event = (eventName, eventProperties) => {
            if (!this.logConfig.enabled)
                return;
            if (this.consoleLogEnabled) {
                console.log(eventName);
                if (eventProperties) {
                    console.table(eventProperties);
                }
            }
            this.appInsightsClient.trackEvent({ name: eventName, properties: eventProperties });
        };
        this.error = (exception) => {
            if (!this.logConfig.enabled)
                return;
            if (this.consoleLogEnabled) {
                console.error(exception);
            }
            this.appInsightsClient.trackException({ exception: exception });
        };
        this.logConfig = mrs_config_1.default.loggingConfig;
        this.consoleLogEnabled = consoleLogEnabled;
        appInsights.setup(this.logConfig.api_key)
            .setAutoDependencyCorrelation(true)
            .setAutoCollectRequests(true)
            .setAutoCollectDependencies(true)
            .start();
        this.appInsightsClient = appInsights.defaultClient;
    }
}
exports.ApplicationInsightsLogger = ApplicationInsightsLogger;
//# sourceMappingURL=application_insights_logger.js.map