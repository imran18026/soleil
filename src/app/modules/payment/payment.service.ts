import { Payment } from './payment.model';
import { TPayment } from './payment.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

/**
 * Get all payments with query options
 */
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

/**
 * Get a single payment by ID
 */
const getPaymentById = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

/**
 * Create a new payment
 */
const createPayment = async (data: TPayment): Promise<TPayment> => {
  const result = await Payment.create(data);
  return result;
};

/**
 * Update a payment by ID
 */
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

/**
 * Delete a payment by ID
 */
const deletePayment = async (id: string): Promise<TPayment | null> => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

export const PaymentService = {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
