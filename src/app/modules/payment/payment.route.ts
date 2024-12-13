import express from 'express';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middleware/validateRequest';
import { paymentValidation } from './payment.validation';

const router = express.Router();

// Get all payments
router.get('/', PaymentController.getAllPayments);

// Get a single payment by ID
router.get(
  '/:id',
  validateRequest(paymentValidation.getPaymentSchema),
  PaymentController.getPaymentById,
);

// Create a new payment
router.post(
  '/',
  validateRequest(paymentValidation.createPaymentSchema),
  PaymentController.createPayment,
);

// Update a payment by ID
router.patch(
  '/:id',
  validateRequest(paymentValidation.updatePaymentSchema),
  PaymentController.updatePayment,
);

// Delete a payment by ID
router.delete(
  '/:id',
  validateRequest(paymentValidation.deletePaymentSchema),
  PaymentController.deletePayment,
);

export const PaymentRouter = router;
