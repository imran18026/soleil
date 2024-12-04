// File: order.routes.ts
// Description: Express routes for Order module

import express from 'express';
import { OrderController } from './order.controller';
import { orderValidations } from './order.validation';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.get(
  '/pre-orders',
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  OrderController.preOrderChecker,
);
router.post(
  '/create-order',
  // auth(USER_ROLE.CUSTOMER),
  // validateRequest(orderValidations.createOrderValidationSchema),
  OrderController.createOrder,
);

router.get('/', auth(USER_ROLE.ADMIN), OrderController.getAllOrders);

router.get(
  '/my-orders/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  OrderController.myOrders,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
  OrderController.getOrderById,
);

router.patch('/:id', auth(USER_ROLE.ADMIN), OrderController.updateOrder);

router.delete('/:id', auth(USER_ROLE.ADMIN), OrderController.deleteOrder);

export const OrderRoutes = router;
