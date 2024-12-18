// File: payment.model.ts
// Description: Schema and model for mobile payment system

import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductOrder',
      default: null,
    },
    subscriptionOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionOrder',
      default: null,
    },
    method: {
      type: String,
      enum: ['Wave', 'Orange_Money', 'MTN_MoMo', 'Moov_Money'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
