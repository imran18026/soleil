// File: payment.interface.ts
// Description: Interface for mobile payment system

import { Types } from 'mongoose';

export type TPayment = {
  userId: Types.ObjectId;
  productOrderId?: Types.ObjectId | null;
  subscriptionOrderId?: Types.ObjectId | null;
  method: 'Wave' | 'Orange_Money' | 'MTN_MoMo' | 'Moov_Money';
  status: 'pending' | 'success' | 'failed';
  transactionId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
