import { Types } from 'mongoose';

export type TPayment = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  amount: number;
  currency: string;
  method: 'card' | 'mobile_money' | 'bank_transfer';
  status: 'pending' | 'success' | 'failed';
  getWayResponse: Record<string, unknown>;
  transactionId: string;
  transactionDate: Date;
};
