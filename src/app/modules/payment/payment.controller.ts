import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaymentService } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * Get all payments
 */
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.getAllPayments(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payments retrieved successfully!',
    data: result.payments,
    meta: result.meta,
  });
});

/**
 * Get a single payment by ID
 */
const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.getPaymentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully!',
    data: result,
  });
});

/**
 * Create a new payment
 */
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await PaymentService.createPayment(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Payment created successfully!',
    data: result,
  });
});

/**
 * Update a payment
 */
const updatePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await PaymentService.updatePayment(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment updated successfully!',
    data: result,
  });
});

/**
 * Delete a payment
 */
const deletePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PaymentService.deletePayment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment deleted successfully!',
    data: result,
  });
});

export const PaymentController = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
