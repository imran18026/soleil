import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const paymentSchema = new Schema<TPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      enum: ['Wave', 'Orange_Money', 'Mtn_Money', 'Moov_Money'],
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    isAlreadyUsed: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Payment = model<TPayment>('Payment', paymentSchema);
