// File: order.routes.ts
// Description: Express routes for Order module

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OrderController } from './order.controller';
import { orderValidations } from './order.validation';

const router = express.Router();

/**
 * Routes for Order operations
 */
router.post(
  '/create-order',
  // auth(USER_ROLE.CUSTOMER), // Add authorization middleware
  validateRequest(orderValidations.createOrderValidationSchema),
  OrderController.createOrder,
);

router.get(
  '/',
  // auth(USER_ROLE.ADMIN), // Restrict to admin if needed
  OrderController.getAllOrders,
);

router.get(
  '/no-of-orders',OrderController.noOfOrders)

router.get(
  '/my-orders/:id',
  // auth(USER_ROLE.CUSTOMER),
  OrderController.myOrders,
);

router.get(
  '/:id',
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  OrderController.getOrderById,
);

router.patch(
  '/status/:id',
  // auth(USER_ROLE.ADMIN),
  validateRequest(orderValidations.updateOrderStatusValidationSchema),
  OrderController.updateOrderStatus,
);

router.patch(
  '/payment-status/:id',
  // auth(USER_ROLE.ADMIN),
  validateRequest(orderValidations.updatePaymentStatusValidationSchema),
  OrderController.updatePaymentStatusSuccess,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  validateRequest(orderValidations.updateOrderValidationSchema),
  OrderController.updateOrder,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  OrderController.deleteOrder,
);

export const OrderRoutes = router;
