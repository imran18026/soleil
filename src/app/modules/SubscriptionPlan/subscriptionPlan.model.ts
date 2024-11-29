import { Schema, model } from 'mongoose';
import {
  TSubscriptionPlan,
  SubscriptionPlanModel,
} from './subscriptionPlan.interface';

const subscriptionPlanSchema = new Schema<
  TSubscriptionPlan,
  SubscriptionPlanModel
>(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Plan price is required'],
      min: [0, 'Price must be a positive value'],
    },
    lockAccessToYourPage: {
      type: Boolean,
      default: false,
    },
    scanStatistics: {
      type: Boolean,
      default: false,
    },
    notificationReceivedAtEachScan: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [2, 'Minimum duration is 2 days'],
    },
    videoDuration: {
      type: Number,
      required: [true, 'Video duration is required'],
      min: [2, 'Minimum video duration is 2 minutes'],
    },
    features: {
      type: [String],
      required: [true, 'At least one feature is required'],
    },
    isStrickers: {
      type: Boolean,
      default: false,
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
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
      virtuals: true,
    },
  },
);

export const SubscriptionPlan = model<TSubscriptionPlan, SubscriptionPlanModel>(
  'SubscriptionPlan',
  subscriptionPlanSchema,
);
