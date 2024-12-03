// File: order.service.ts
// Description: Service logic for the Order module

import mongoose, { Types } from 'mongoose';
import { Product } from '../Product/product.model';

import { TOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.models';
import { Payment } from '../payment/payment.model';

/**
 * Checks product availability and user existence.
 */
const isAllAvailable = async (
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  quantity: number,
) => {
  const user = await User.findOne({ _id: userId, isDeleted: false });
  if (!user) {
    throw new Error('User does not exist');
  }

  const productName = await Product.findOne({
    _id: productId,
  });

  if (!productName) {
    throw new Error('Product does not exist');
  }

  const product = await Product.find({
    productName: productName?.productName,
    isHidden: false,
    isSold: false,
    isDeleted: false,
    isAvailable: true,
  });

  if (product.length < quantity) {
    throw new Error(` Only ${product.length} Products is available`);
  }
};

const preOrderChecker = async (
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  quantity: number,
): Promise<void> => {
  await isAllAvailable(userId, productId, quantity);
};

/**
 * Creates a new order with transaction and rollback.
 */
const createOrder = async (
  data: Partial<TOrder>,
): Promise<TOrder | undefined> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Validate if the user and product exist
    const product = await Product.findById(data.product);

    // Optional: Check if payment exists and is successful
    if (data.paymentId) {
      const payment = await Payment.findById(data.paymentId);
      if (!payment || payment.status !== 'success') {
        throw new Error('Payment is invalid or not completed');
      }
    }
    // Create the order
    const order = await Order.create([data], { session });
    // Update product quantity
    await Product.findByIdAndUpdate(
      data.product,
      { $inc: { quantity: -Number(data.quantity) } },
      { session },
    );

    await session.commitTransaction();
    return order[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
const getAllOrders = async (query: Record<string, unknown>) => {
  const orders = await Order.find(query).populate('user product');
  return orders;
};

const myOrders = async (id: string): Promise<TOrder[]> => {
  const orders = await Order.find({ user: id });
  return orders;
};

const getOrderById = async (id: string): Promise<TOrder | null> => {
  const order = await Order.findById(id).populate('user product');
  return order;
};

const updateOrder = async (
  id: string,
  payload: Partial<TOrder>,
): Promise<TOrder | null> => {
  const updatedOrder = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return updatedOrder;
};

const deleteOrder = async (id: string): Promise<TOrder | null> => {
  const deletedOrder = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return deletedOrder;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  preOrderChecker,
  myOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
