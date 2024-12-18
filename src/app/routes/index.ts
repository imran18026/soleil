import { Router } from 'express';

import { CategoryRoutes } from '../modules/Category/category.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { OtpRoutes } from '../modules/otp/otp.routes';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { ProductsRoutes } from '../modules/Product/product.route';
import { PurchaseSubscriptionRoutes } from '../modules/PurchaseSubscription/purchaseSubscription.route';
import { SettingsRoutes } from '../modules/settings/settings.routes';
import { SubscriptionPlanRoutes } from '../modules/SubscriptionPlan/subscriptionPlan.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { ProductInfoRoutes } from '../modules/ProductInfo/productInfo.route';
import { userRoutes } from '../modules/user/user.route';
import { GadgetsRoutes } from '../modules/Gadget/gadget.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/otp',
    route: OtpRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductsRoutes,
  },
  {
    path: '/product-info',
    route: ProductInfoRoutes,
  },
  {
    path: '/subscriptionsplans',
    route: SubscriptionPlanRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/purchaseSubscription',
    route: PurchaseSubscriptionRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
  {
    path: '/gadgets',
    route: GadgetsRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
