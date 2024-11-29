"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const user_constants_1 = require("../user/user.constants");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.authControllers.login);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.authValidation.refreshTokenValidationSchema), auth_controller_1.authControllers.refreshToken);
router.post('/forgot-password-otp', 
// validateRequest(authValidation.forgetPasswordValidationSchema),
auth_controller_1.authControllers.forgotPassword);
router.patch('/change-password', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.CUSTOMER), auth_controller_1.authControllers.changePassword);
router.patch('/forgot-password-otp-match', 
// validateRequest(authValidation.otpMatchValidationSchema),
auth_controller_1.authControllers.forgotPasswordOtpMatch);
router.patch('/forgot-password-reset', (0, validateRequest_1.default)(auth_validation_1.authValidation.resetPasswordValidationSchema), auth_controller_1.authControllers.resetPassword);
exports.AuthRoutes = router;
