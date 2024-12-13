import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { OtpRoutes } from '../modules/otp/otp.routes';
import { PaymentRouter } from '../modules/payment/payment.route';
import { ProductsRoutes } from '../modules/Product/product.route';
import { ProductInfoRoutes } from '../modules/ProductInfo/ProductInfo.route';
import { PurchaseSubscriptionRoutes } from '../modules/PurchaseSubscription/purchaseSubscription.route';
import { SettingsRoutes } from '../modules/settings/settings.routes';
import { SubscriptionPlanRoutes } from '../modules/SubscriptionPlan/subscriptionPlan.route';
import { userRoutes } from '../modules/user/user.route';

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
    route: PaymentRouter,
  },
  {
    path: '/settings',
    route: SettingsRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
