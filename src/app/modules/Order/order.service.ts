// File: order.service.ts
// Description: Service logic for the Order module

import mongoose from 'mongoose';
import { Product } from '../Product/product.model';
import { User } from '../user/user.models';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { ProductInfo } from '../ProductInfo/productInfo.model';
import { orderSearchableFields } from './order.constant';

/**
 * Creates a new order with transaction and rollback support.
 */
const createOrder = async (data: Partial<TOrder>): Promise<TOrder> => {
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!data.quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Quantity is required');
  }

  const productInfo = await ProductInfo.findById(data.productInfoId);
  if (!productInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product info not found');
  }

  if (!data.deliveryCost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Delivery cost is required');
  }

  if (data.deliveryCost && data.quantity) {
    data.price = data.quantity * productInfo.price + data.deliveryCost;
    data.productsCost = data.quantity * productInfo.price;
  }

  const availableProducts = await Product.find({
    productInfoId: data.productInfoId,
    isSold: false,
  });

  if (availableProducts.length < data.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Only ${availableProducts.length} products available`,
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await Order.create(data);
    console.log(order);
    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.NOT_FOUND, 'Order failed');
  } finally {
    session.endSession();
  }
};

/**
 * Fetches all orders with query support for filtering, sorting, and pagination.
 */

const noOfOrders = async (): Promise<number> => {
  return await Order.countDocuments();
};
const getAllOrders = async (query: Record<string, unknown>) => {
  const ordersQuery = new QueryBuilder(
    Order.find().populate('productInfoId'),
    query,
  )
    .search(orderSearchableFields) // Define searchable fields
    .filter(['status', 'orderPaymentStatus', 'userId']) // Define filterable fields
    .sort()
    .paginate()
    .fields();

  const meta = await ordersQuery.countTotal();
  const result = await ordersQuery.modelQuery;
  return { meta, result };
};

/**
 * Fetches orders for a specific user.
 */
const myOrders = async (userId: string): Promise<TOrder[]> => {
  return await Order.find({ userId }).populate('productInfoId');
};

/**
 * Fetches a single order by ID.
 */
const getOrderById = async (orderId: string): Promise<TOrder | null> => {
  return await Order.findById(orderId).populate('productInfoId');
};

/**
 * Updates the status of an order.
 */
const updateOrderStatus = async (
  orderId: string,
  status: { status: 'New order' | 'In the process' | 'Order delivered' },
): Promise<TOrder | null> => {
  return await Order.findByIdAndUpdate(orderId, status, {
    new: true,
    runValidators: true,
  });
};

/**
 * Updates the payment status of an order.
 */
const updatePaymentStatusSuccess = async (
  orderId: string,
  paymentData: Partial<TOrder>,
): Promise<TOrder | null> => {
  return await Order.findByIdAndUpdate(orderId, paymentData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Updates an order.
 */
const updateOrder = async (
  orderId: string,
  updateData: Partial<TOrder>,
): Promise<TOrder | null> => {
  return await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Soft deletes an order by marking it as deleted.
 */
const deleteOrder = async (orderId: string): Promise<TOrder | null> => {
  return await Order.findByIdAndUpdate(
    orderId,
    { isDeleted: true },
    { new: true },
  );
};

export const OrderService = {
  createOrder,
  noOfOrders,
  getAllOrders,
  myOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  updatePaymentStatusSuccess,
};
