"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constants_1 = require("../user/user.constants");
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
router.post('/create-notification', 
//   auth(USER_ROLE.USER),
//   validateRequest(paymnetValidation),
notification_controller_1.NotificationController.createNotification);
router.get('', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.CUSTOMER), notification_controller_1.NotificationController.getAllNotificationByUser);
router.get('/admin-all', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN), notification_controller_1.NotificationController.getAllNotificationByAdmin);
router.get('/:id', notification_controller_1.NotificationController.getSingleNotification);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.CUSTOMER), notification_controller_1.NotificationController.deletedNotification);
router.delete('/admin/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN, user_constants_1.USER_ROLE.CUSTOMER), notification_controller_1.NotificationController.deletedAdminNotification);
exports.NotificationRoutes = router;
