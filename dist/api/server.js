"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mrs_config_1 = __importDefault(require("./configuration/mrs_config"));
const client_route_1 = __importDefault(require("./routers/client.route"));
const winstonExpress = require("express-winston");
var app = (0, express_1.default)();
var corsOptions = {
    origin: mrs_config_1.default.cors.allowedOrigins,
    methods: mrs_config_1.default.cors.allowedMethods,
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use((0, cors_1.default)(corsOptions));
app.use("/client", client_route_1.default);
module.exports = app;
//# sourceMappingURL=server.js.map