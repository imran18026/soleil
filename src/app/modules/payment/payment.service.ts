import AppError from '../../error/AppError';
import { User } from '../user/user.models';
import { TPayment } from './payment.interface';
import { Payment } from './payment.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Product } from '../Product/product.model';
import httpStatus from 'http-status';

const addPaymentService = async (data: Partial<TPayment>) => {
  const user = await User.findById(data.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Payment.create(data);

  return result;
};

const getAllPaymentService = async (query: Record<string, unknown>) => {
  const PaymentQuery = new QueryBuilder(
    Payment.find().populate('userId').populate('productId'),
    query,
  )
    .search(['name'])
    .filter([''])
    .sort()
    .paginate()
    .fields();

  const result = await PaymentQuery.modelQuery;
  const meta = await PaymentQuery.countTotal();
  return { meta, result };
};

const getAllPaymentByMentorService = async (
  query: Record<string, unknown>,
  mentorId: string,
) => {
  const PaymentQuery = new QueryBuilder(Payment.find({ mentorId }), query)
    .search(['name'])
    .filter([''])
    .sort()
    .paginate()
    .fields();

  const result = await PaymentQuery.modelQuery;
  const meta = await PaymentQuery.countTotal();
  return { meta, result };
};

const singlePaymentService = async (id: string) => {
  const task = await Payment.findById(id);
  return task;
};

const deleteSinglePaymentService = async (id: string) => {
  const result = await Payment.deleteOne({ _id: id });
  return result;
};

export const paymentService = {
  addPaymentService,
  getAllPaymentService,
  singlePaymentService,
  deleteSinglePaymentService,
  getAllPaymentByMentorService,
};
