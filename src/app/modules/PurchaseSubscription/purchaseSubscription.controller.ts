import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PurchaseSubscriptionService } from './purchaseSubscription.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await PurchaseSubscriptionService.createOrder(orderData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Subscription order created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await PurchaseSubscriptionService.getAllOrders(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription orders retrieved successfully!',
    data: result,
  });
});

const myOrders = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PurchaseSubscriptionService.myOrders(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My subscription orders retrieved successfully!',
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PurchaseSubscriptionService.getOrderById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription order retrieved successfully!',
    data: result,
  });
});

const updatePaymentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;
  const result = await PurchaseSubscriptionService.updatePaymentStatus(
    id,
    paymentStatus,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Payment status updated to '${paymentStatus}' successfully!`,
    data: result,
  });
});

export const PurchaseSubscriptionController = {
  createOrder,
  getAllOrders,
  myOrders,
  getOrderById,
  updatePaymentStatus,
};
