// File: order.routes.ts
// Description: Express routes for Order module

import express from 'express';
import { QrManageController } from './qrManage.controller';

const router = express.Router();

// router.get(
//   '/pre-orders',
//   // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
//   OrderController.preOrderChecker,
// );
router
  .post(
    '/create-qr-manage',
    // auth(USER_ROLE.CUSTOMER),
    // validateRequest(orderValidations.createOrderValidationSchema),
    QrManageController.createQrManage,
  )
  .get('/:id', QrManageController.getAllQrManage);

// router.get('/', OrderController.getAllOrders);

export const QrManageRoutes = router;
