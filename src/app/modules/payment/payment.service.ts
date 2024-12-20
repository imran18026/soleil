// import { Payment } from './payment.model';
// import { TPayment } from './payment.interface';
// import QueryBuilder from '../../builder/QueryBuilder';
// import AppError from '../../error/AppError';
// import httpStatus from 'http-status';
// import https from 'https';

// const createPayment = async (data: TPayment): Promise<TPayment> => {
//   const result = await Payment.create(data);
//   return result;
// };

// /**
//  * Get all payments with query options
//  */
// const getAllPayments = async (query: Record<string, unknown>) => {
//   const queryBuilder = new QueryBuilder(Payment.find(), query)
//     .search(['transactionId', 'method'])
//     .filter(['status', 'userId'])
//     .sort()
//     .paginate()
//     .fields();

//   const payments = await queryBuilder.modelQuery;
//   const meta = await queryBuilder.countTotal();

//   return { payments, meta };
// };

// /**
//  * Get a single payment by ID
//  */
// const getPaymentById = async (id: string): Promise<TPayment | null> => {
//   const payment = await Payment.findById(id);
//   if (!payment) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
//   }
//   return payment;
// };

// /**
//  * Create a new payment
//  */

// /**
//  * Update a payment by ID
//  */
// const updatePayment = async (
//   id: string,
//   data: Partial<TPayment>,
// ): Promise<TPayment | null> => {
//   const payment = await Payment.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });
//   if (!payment) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
//   }
//   return payment;
// };

// /**
//  * Delete a payment by ID
//  */
// const deletePayment = async (id: string): Promise<TPayment | null> => {
//   const payment = await Payment.findByIdAndDelete(id);
//   if (!payment) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
//   }
//   return payment;
// };

// export const PaymentService = {
//   getAllPayments,
//   getPaymentById,
//   createPayment,
//   updatePayment,
//   deletePayment,
// };

// File: payment.service.ts
// Description: Service layer for Payment module

import { Payment } from './payment.model';
import { TPayment } from './payment.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import https from 'https';
import config from '../../config';
import { User } from '../user/user.models';
import { Order } from '../Order/order.model';
import { PurchaseSubscription } from '../PurchaseSubscription/purchaseSubscription.model';
import mongoose from 'mongoose';
import { Product } from '../Product/product.model';
import { ProductInfo } from '../ProductInfo/productInfo.model';
import { Gadgets } from '../Gadget/gadget.model';
import { Category } from '../Category/category.model';

/**
 * Utility function to make HTTPS POST requests
 */
function makeHttpsRequest(
  url: string,
  data: Record<string, any>,
  headers: Record<string, string>,
) {
  return new Promise((resolve, reject) => {
    const requestData = JSON.stringify(data);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length,
        ...headers,
      },
    };
    const req = https.request(url, options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode < 300) {
          resolve(JSON.parse(responseBody));
        } else {
          reject(new Error(responseBody));
        }
      });
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.write(requestData);
    req.end();
  });
}

/**
 * Payment Service Methods
 */
const createPayment = async (data: TPayment): Promise<TPayment | any> => {
  // console.log(data);
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  let order;
  if (data.productOrderId) {
    order = await Order.findById(data.productOrderId);

    if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product order not found');
    }
    data.amount = order.price;
  }
  if (data.subscriptionOrderId) {
    order = await PurchaseSubscription.findById(data.subscriptionOrderId);
    if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, 'Subscription order not found');
    }
    data.amount = order.price;
  }

  // console.log(user, order);

  const result = await Payment.create(data);
  return result;
};

const processPayment = async (id: string): Promise<TPayment> => {
  const paymentRecord = await Payment.findById(id);

  if (!paymentRecord) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  if (paymentRecord.status !== 'pending') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Payment already processed');
  }

  let paymentUrl = '';
  switch (paymentRecord?.method) {
    case 'Wave':
      paymentUrl = config.wave_payment_url as string;
      break;
    case 'Orange_Money':
      paymentUrl = config.orange_money_payment_url as string;
      break;
    case 'MTN_MoMo':
      paymentUrl = config.mtn_momo_payment_url as string;
      break;
    case 'Moov_Money':
      paymentUrl = config.moov_money_payment_url as string;
      break;
    default:
      throw new AppError(httpStatus.BAD_REQUEST, 'Unsupported payment method');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // await makeHttpsRequest(paymentUrl, paymentData, {
    //   Authorization: `Bearer ${paymentData.transactionId}`,
    // });

    if (paymentRecord?.subscriptionOrderId !== null) {
      await User.findByIdAndUpdate(
        paymentRecord.userId,
        {
          isSubscribed: true,
          subcriptionOrderId: paymentRecord.subscriptionOrderId,
        },
        session,
      );

      await PurchaseSubscription.findByIdAndUpdate(
        paymentRecord.subscriptionOrderId,
        {
          status: 'active',
          // subscriptionStatus: 'active',
          paymentId: paymentRecord._id,
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
    }

    if (paymentRecord?.productOrderId !== null) {
      const data = await Order.findById(paymentRecord.productOrderId);

      if (!data) {
        throw new AppError(httpStatus.NOT_FOUND, 'Order data not found');
      }

      const productIdArray: string[] = [];

      for (let i = 0; i < data.quantity; i++) {
        const product = await Product.findOneAndUpdate(
          { productInfoId: data.productInfoId, isSold: false },
          { isSold: true },
          { new: true, session },
        );

        if (product) {
          productIdArray.push(product._id.toString());

          const productInfo = await ProductInfo.findByIdAndUpdate(
            product.productInfoId,
            {
              $inc: { attributed: 1, available: -1 },
            },
            { new: true, session },
          );

          if (!productInfo) {
            throw new AppError(httpStatus.NOT_FOUND, 'Product info not found');
          }

          await Category.findByIdAndUpdate(
            productInfo.categoryId,
            {
              $inc: { attributed: 1, available: -1 },
            },
            { session },
          );

          await Gadgets.create(
            {
              userId: paymentRecord.userId,
              productId: product._id,
            },
            { session },
          );
        }
      }

      await User.findByIdAndUpdate(
        data.userId,
        { $inc: { orderProducts: data.quantity } },
        { session },
      );
      await ProductInfo.findByIdAndUpdate(
        data.productInfoId,
        { $inc: { attributed: data.quantity } },
        { session },
      );

      await Order.findByIdAndUpdate(
        paymentRecord.productOrderId,
        {
          productIds: productIdArray,
          orderPaymentStatus: 'success',
          isPaymentDone: true,
          paymentId: paymentRecord._id,
          status: 'New order',
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
    }

    const result = await Payment.findByIdAndUpdate(
      id,
      {
        status: 'success',
      },
      {
        new: true,
        // runValidators: true,
        session,
      },
    );
    await session.commitTransaction();
    return result as TPayment;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Payment failed');
  } finally {
    await session.endSession();
  }
};

const getAllPayments = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Payment.find(), query)
    .search(['transactionId', 'method'])
    .filter(['status', 'userId'])
    .sort()
    .paginate()
    .fields();

  const payments = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return { payments, meta };
};

const getPaymentById = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

const updatePayment = async (
  id: string,
  data: Partial<TPayment>,
): Promise<TPayment | null> => {
  const payment = await Payment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

const deletePayment = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

export const PaymentService = {
  createPayment,
  processPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
