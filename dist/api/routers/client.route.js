"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../controllers/client.controller");
var clientRouter = express_1.default.Router();
const clientController = new client_controller_1.ClientController();
console.info("inside clientcontroller");
clientRouter.get('/get', clientController.getClients);
exports.default = clientRouter;
//# sourceMappingURL=client.route.js.map