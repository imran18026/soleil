import { Model } from 'mongoose';

export type TSubscriptionPlan = {
  name: string; // Name of the subscription plan
  price: number; // Cost of the subscription plan
  lockAccessToYourPage: boolean;
  scanStatistics: boolean;
  notificationReceivedAtEachScan: boolean;
  durationDays: number; // Duration in days
  videoDuration: number; // Maximum video duration in minutes
  isStrickers: boolean;
  quantity: number;
  isActive: boolean; // Indicates whether the plan is active
  isDeleted: boolean; // Indicates if the plan is soft-deleted
  createOrAddVideo: boolean;
  noofSubscribers: number;
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
};

export type SubscriptionPlanModel = Model<TSubscriptionPlan>;
