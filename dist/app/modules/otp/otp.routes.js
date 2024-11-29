"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRoutes = void 0;
const express_1 = __importDefault(require("express"));
const otp_controller_1 = require("./otp.controller");
const route = express_1.default.Router();
route.patch('/resend-otp', otp_controller_1.otpControllers.resendOtp);
exports.OtpRoutes = route;
