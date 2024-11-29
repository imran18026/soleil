import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { OtpRoutes } from '../modules/otp/otp.routes';
import { NotificationRoutes } from '../modules/notification/notification.route';
import { CategoryRoutes } from '../modules/Category/category.route';
import { ProductsRoutes } from '../modules/Product/product.route';
import { SubscriptionPlanRoutes } from '../modules/SubscriptionPlan/subscriptionPlan.route';

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
    path: '/subscriptionsplans',
    route: SubscriptionPlanRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
