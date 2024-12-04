// File: order.service.ts
// Description: Service logic for the Order module

import mongoose, { Types } from 'mongoose';
import { Product } from '../Product/product.model';

import { TOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.models';
import { Payment } from '../payment/payment.model';
import { Category } from '../Category/category.model';

/**
 * Checks product availability and user existence.
 */

type preOrderCheckerResponse = {
  productName?: string;
  isValid: boolean;
};
const isAllAvailable = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<preOrderCheckerResponse> => {
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
  });

  if (product.length < quantity) {
    throw new Error(` Only ${product.length} Products is available`);
  }
  if (product.length >= quantity) {
    return { productName: productName?.productName, isValid: true };
  }
  return { isValid: false };
};

const preOrderChecker = async (
  userId: string,
  productId: string,
  quantity: number,
): Promise<preOrderCheckerResponse> => {
  const data = await isAllAvailable(userId, productId, quantity);
  return data;
};

/**
 * Creates a new order with transaction and rollback.
 */
const createOrder = async (
  data: Partial<TOrder> & { productName?: string },
): Promise<TOrder | any> => {
  if (data.paymentId) {
    const payment = await Payment.findOne({
      _id: data.paymentId,
      isAlreadyUsed: false,
    });
    if (!payment || payment.status !== 'pending') {
      throw new Error('Payment is invalid');
    }
  }

  const user = await User.findById(data.userId);
  if (!user) {
    throw new Error('User not found');
  }

  const quantity = data?.quantity || 1;

  const productIds = await Product.find({
    productName: data?.productName,
    isSold: false,
    isHidden: false,
  })
    .select('_id')
    .limit(quantity);

  const productIdArray = productIds.map((item) => item._id.toString());
  if (productIdArray.length === 0) {
    throw new Error('Product not found');
  }

  delete data.productName;
  data.productIds = [...productIdArray];
  data.ispaymentDone = true;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    productIdArray.map(async (id) => {
      await Product.findByIdAndUpdate(id, {
        isSold: true,
      }),
        { new: true, session };
    });

    const user = await User.findByIdAndUpdate(
      data.userId,
      {
        $inc: { orderdProducts: quantity },
      },
      { new: true, session },
    );

    const categoryId = await Product.findOne({ _id: productIds[0] }).select(
      'category',
    );

    const value = await Category.findByIdAndUpdate(
      categoryId?.category,
      {
        $inc: { available: -Number(quantity), attributed: Number(quantity) },
      },
      { new: true, session },
    );
    console.log(value);

    await Payment.findByIdAndUpdate(
      data.paymentId,
      { isAlreadyUsed: true, status: 'success' },
      { new: true, session },
    );

    const order = await Order.create([data], { session });

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
