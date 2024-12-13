import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
    },
    subscriptionOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionOrder',
      default: null,
    },
    method: {
      type: String,
      enum: ['card', 'Wave', 'Orange_Money', 'Mtn_Money', 'Moov_Money'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    isAlreadyUsed: {
      type: Boolean,
      default: false,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
