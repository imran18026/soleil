import express from 'express';
import { paymentController } from './payment.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

// import { auth } from "../../middlewares/auth.js";

const paymentRouter = express.Router();

paymentRouter
  .post('/add-payment', 
    // auth(USER_ROLE.CUSTOMER), 
    paymentController.addPayment)
  .get('/', 
    // auth(USER_ROLE.ADMIN), 
    paymentController.getAllPayment)
  .get('/:id',
    //  auth(USER_ROLE.ADMIN), 
  paymentController.getSinglePayment)
  .get(
    '/admin',
    // auth(USER_ROLE.ADMIN),
    paymentController.getAllPaymentByMentor,
  )
  .delete(
    '/:id',
    // auth(USER_ROLE.ADMIN),
    paymentController.deleteSinglePayment,
  );

export default paymentRouter;
