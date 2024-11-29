import { Model } from 'mongoose';

export type TSubscriptionPlan = {
  name: string; // Name of the subscription plan
  description?: string; // Optional description
  price: number; // Cost of the subscription plan
  lockAccessToYourPage: boolean;
  scanStatistics: boolean;
  notificationReceivedAtEachScan: boolean;
  duration: number; // Duration in days
  features: string[]; // List of features included in the plan
  videoDuration: number; // Maximum video duration in minutes
  isStrickers: boolean;
  isActive: boolean; // Indicates whether the plan is active
  isDeleted: boolean; // Indicates if the plan is soft-deleted
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
};

export type SubscriptionPlanModel = Model<TSubscriptionPlan>;
