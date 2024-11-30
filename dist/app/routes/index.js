"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const otp_routes_1 = require("../modules/otp/otp.routes");
const notification_route_1 = require("../modules/notification/notification.route");
const category_route_1 = require("../modules/Category/category.route");
const product_route_1 = require("../modules/Product/product.route");
const subscriptionPlan_route_1 = require("../modules/SubscriptionPlan/subscriptionPlan.route");
const order_route_1 = require("../modules/Order/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/otp',
        route: otp_routes_1.OtpRoutes,
    },
    {
        path: '/notification',
        route: notification_route_1.NotificationRoutes,
    },
    {
        path: '/categories',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/products',
        route: product_route_1.ProductsRoutes,
    },
    {
        path: '/subscriptionsplans',
        route: subscriptionPlan_route_1.SubscriptionPlanRoutes,
    },
    {
        path: '/order',
        route: order_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
