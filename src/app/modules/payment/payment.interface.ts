import { Types } from 'mongoose';

export type TPayment = {
  userId: Types.ObjectId;
  amount: number;
  method: 'Wave' | 'Orange_Money' | 'Mtn_Money' | 'Moov_Money';
  status: 'pending' | 'success' | 'failed';
  transactionId: string;
  isAlreadyUsed: boolean;
  transactionDate: Date;
};
