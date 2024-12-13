import { Types } from 'mongoose';

export type TPayment = {
  userId: Types.ObjectId;
  productOrderId?: Types.ObjectId | null;
  subscriptionOrderId?: Types.ObjectId | null;
  method: 'card' | 'Wave' | 'Orange_Money' | 'Mtn_Money' | 'Moov_Money';
  status: 'pending' | 'success' | 'failed';
  transactionId: string;
  clientSecret: string;
  isAlreadyUsed: boolean;
  transactionDate: Date;
};
