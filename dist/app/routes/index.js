"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_route_1 = require("../modules/Category/category.route");
const notification_route_1 = require("../modules/notification/notification.route");
const order_route_1 = require("../modules/Order/order.route");
const otp_routes_1 = require("../modules/otp/otp.routes");
const payment_route_1 = require("../modules/payment/payment.route");
const product_route_1 = require("../modules/Product/product.route");
const purchaseSubscription_route_1 = require("../modules/PurchaseSubscription/purchaseSubscription.route");
const settings_routes_1 = require("../modules/settings/settings.routes");
const subscriptionPlan_route_1 = require("../modules/SubscriptionPlan/subscriptionPlan.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const productInfo_route_1 = require("../modules/ProductInfo/productInfo.route");
const user_route_1 = require("../modules/user/user.route");
const gadget_route_1 = require("../modules/Gadget/gadget.route");
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
        path: '/product-info',
        route: productInfo_route_1.ProductInfoRoutes,
    },
    {
        path: '/subscriptionsplans',
        route: subscriptionPlan_route_1.SubscriptionPlanRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/purchaseSubscription',
        route: purchaseSubscription_route_1.PurchaseSubscriptionRoutes,
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: '/settings',
        route: settings_routes_1.SettingsRoutes,
    },
    {
        path: '/gadgets',
        route: gadget_route_1.GadgetsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
