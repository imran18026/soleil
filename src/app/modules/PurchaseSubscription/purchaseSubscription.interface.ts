import { Model, Types } from 'mongoose';

export type TPurchaseSubscription = {
  userId: Types.ObjectId; // Reference to the user
  subscriptionId: Types.ObjectId; // Reference to the subscription plan
  paymentId?: Types.ObjectId; // Optional payment reference
  subscriptionStatus: 'pending'|'active' | 'expired' | 'cancelled'; // Status of the subscription
  paymentStatus: 'pending' | 'success' | 'failed'; // Payment status
  price: number; // Price of the subscription
  expireDate: Date; // Expiration date
  videoDuration: number; // Duration of the subscription
  isActive: boolean; // Indicates if the subscription is active
  isDeleted: boolean; // Indicates if the subscription is deleted
  createdAt?: Date; // Timestamp for creation
  updatedAt?: Date; // Timestamp for last update
};

export type PurchaseSubscriptionModel = Model<TPurchaseSubscription>;
