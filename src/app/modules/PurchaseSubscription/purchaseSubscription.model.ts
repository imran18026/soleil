import { Schema, model } from 'mongoose';
import {
  TPurchaseSubscription,
  PurchaseSubscriptionModel,
} from './purchaseSubscription.interface';

const purchaseSubscriptionSchema = new Schema<
  TPurchaseSubscription,
  PurchaseSubscriptionModel
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      required: false,
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    price: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const PurchaseSubscription = model<
  TPurchaseSubscription,
  PurchaseSubscriptionModel
>('PurchaseSubscription', purchaseSubscriptionSchema);
