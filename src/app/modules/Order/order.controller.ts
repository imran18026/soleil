// File: order.controller.ts
// Description: Controller logic for the Order module

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;

  const result = await OrderService.createOrder(orderData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully!',
    data: result.result,
    meta: result.meta,
  });
});

const myOrders = catchAsync(async (req: Request, res: Response) => {
  const { id: userId } = req.params; // User ID passed as a route parameter
  const result = await OrderService.myOrders(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User orders retrieved successfully!',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.myOrders(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My orders retrieved successfully!',
    data: result,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getOrderById(id);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Order not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully!',
    data: result,
  });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await OrderService.updateOrder(id, payload);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Order not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order updated successfully!',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await OrderService.updateOrderStatus(id, payload);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Order not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully!',
    data: result,
  });
});

const updatePaymentStatusSuccess = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await OrderService.updatePaymentStatusSuccess(id, payload);
    if (!result) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      });
      return;
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment status updated successfully!',
      data: result,
    });
  },
);

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrder(id);
  if (!result) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Order not found',
      data: null,
    });
    return;
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  myOrders,
  updatePaymentStatusSuccess,
};
