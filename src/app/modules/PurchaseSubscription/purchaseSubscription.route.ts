import express from 'express';
import { PurchaseSubscriptionController } from './purchaseSubscription.controller';

const router = express.Router();

router.post('/create-order', PurchaseSubscriptionController.createOrder);
router.get('/', PurchaseSubscriptionController.getAllOrders);
router.get ('/no-of-all-premium', PurchaseSubscriptionController.noOfAllPremium);
router.get('/my-orders/:id', PurchaseSubscriptionController.myOrders);
router.get('/:id', PurchaseSubscriptionController.getOrderById);
router.patch(
  '/payment-status/:id',
  PurchaseSubscriptionController.updatePaymentStatus,
);

export const PurchaseSubscriptionRoutes = router;
