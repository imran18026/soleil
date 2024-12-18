import mongoose from 'mongoose';
import { Payment } from '../payment/payment.model';
import { SubscriptionPlan } from '../SubscriptionPlan/subscriptionPlan.model';
import { User } from '../user/user.models';
import { TPurchaseSubscription } from './purchaseSubscription.interface';
import { PurchaseSubscription } from './purchaseSubscription.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { error } from 'console';

/**
 * Creates a new subscription purchase.
 */
const createOrder = async (
  data: Partial<TPurchaseSubscription>,
): Promise<TPurchaseSubscription | any> => {
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const subscriptionPlan = await SubscriptionPlan.findById(data.subscriptionId);

  if (!subscriptionPlan) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subscription plan not found');
  }
  data.videoDuration = subscriptionPlan.videoDuration;
  data.price = subscriptionPlan.price;
  if (data.price === 0) {
    data.subscriptionStatus = 'active';
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Update user subscription status
    // await User.findByIdAndUpdate(
    //   data.userId,
    //   { isSubscribed: true },
    //   { new: true, session },
    // );

    // await SubscriptionPlan.findByIdAndUpdate(
    //   data.subscriptionId,
    //   {
    //     $inc: { quantity: 1 },
    //   },
    //   {
    //     new: true,
    //     session,
    //   },
    // );
    // const payment = await Payment.findById(data.paymentId);

    // if (
    //   payment?.amount !== subscriptionPlan.price ||
    //   subscriptionPlan.price !== 0
    // ) {
    //   throw new AppError(
    //     httpStatus.BAD_REQUEST,
    //     'Payment amount does not match subscription plan amount',
    //   );
    // }
    const expireDate = new Date();
    if (subscriptionPlan.videoDuration !== 2) {
      expireDate.setDate(
        expireDate.getDate() + subscriptionPlan.durationDays * 30,
      );
      data.expireDate = expireDate;
    }
    if (subscriptionPlan.durationDays === 2) {
      expireDate.setDate(expireDate.getDate() + subscriptionPlan.durationDays);
      data.expireDate = expireDate;
    }
    const result = await PurchaseSubscription.create([data], { session });
    await session.commitTransaction();
    return result[0];
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error from purchase subscription',
    );
  } finally {
    await session.endSession();
  }
};

/**
 * Get all subscription purchases.
 */
const getAllOrders = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    PurchaseSubscription.find().populate('userId').populate('subscriptionId'),
    query,
  )
    .search(['userId', 'subscriptionId'])
    .filter(['paymentStatus', 'subscriptionStatus'])
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const result = await categoryQuery.modelQuery;
  return { meta, result };
};

/**
 * Get subscription purchases for a specific user.
 */
const myOrders = async (id: string): Promise<TPurchaseSubscription[]> => {
  const orders = await PurchaseSubscription.find({ userId: id });
  return orders;
};

/**
 * Get a single subscription purchase by ID.
 */
const getOrderById = async (
  id: string,
): Promise<TPurchaseSubscription | null> => {
  const order = await PurchaseSubscription.findById(id);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subscription order not found');
  }
  return order;
};

/**
 * Update payment status for a subscription purchase.
 */
const updatePaymentStatus = async (
  id: string,
  paymentStatus: 'pending' | 'success' | 'failed',
): Promise<TPurchaseSubscription | null> => {
  const updatedOrder = await PurchaseSubscription.findByIdAndUpdate(
    id,
    { paymentStatus },
    { new: true, runValidators: true },
  );
  return updatedOrder;
};

export const PurchaseSubscriptionService = {
  createOrder,
  getAllOrders,
  myOrders,
  getOrderById,
  updatePaymentStatus,
};
