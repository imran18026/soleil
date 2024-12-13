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

    price: {
      type: Number,
      required: [true, 'Plan price is required'],
      min: [0, 'Price must be a positive value'],
      default: 0,
    },
    lockAccessToYourPage: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive value'],
      default: 0,
    },
    scanStatistics: {
      type: Boolean,
      default: false,
    },
    notificationReceivedAtEachScan: {
      type: Boolean,
      default: false,
    },
    createOrAddVideo: {
      type: Boolean,
      default: true,
    },
    durationDays: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [2, 'Minimum duration is 2 days'],
    },
    videoDuration: {
      type: Number,
      required: [true, 'Video duration is required'],
      min: [2, 'Minimum video duration is 2 minutes'],
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
    noofSubscribers: {
      type: Number,
      default: 0,
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
