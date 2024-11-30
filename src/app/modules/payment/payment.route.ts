import express from 'express';
import { paymentController } from './payment.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

// import { auth } from "../../middlewares/auth.js";

const router = express.Router();

router.post(
  '/add-payment',
  // auth(USER_ROLE.CUSTOMER),
  paymentController.addPayment,
);
router.get(
  '/',
  // auth(USER_ROLE.ADMIN),
  paymentController.getAllPayment,
);
router.get(
  '/:id',
  //  auth(USER_ROLE.ADMIN),
  paymentController.getSinglePayment,
);
router.get(
  '/admin',
  // auth(USER_ROLE.ADMIN),
  paymentController.getAllPaymentByMentor,
);
router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  paymentController.deleteSinglePayment,
);

export const PaymentRouter = router;
