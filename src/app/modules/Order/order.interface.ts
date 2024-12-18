// File: order.interface.ts
// Description: Interface and type definitions for the Order module

import { Model, Types } from 'mongoose';

export type TOrder = {
  userId: Types.ObjectId; // Reference to the user placing the order
  productIds: string[]; // Reference to the products in the order
  paymentId: Types.ObjectId; // Reference to the payment for this order
  productInfoId: Types.ObjectId; // Reference to product info
  quantity: number; // Quantity of products ordered
  deliveryCost: number; // Cost of delivery
  productsCost: number; // Total amount for the order
  price: number; // Total amount for the order
  orderPaymentStatus: 'pending' | 'success' | 'failed'; // Payment status
  status: 'pending' | 'New order' | 'In the process' | 'Order delivered'; // Order status
  isAbidjan: boolean; // Whether delivery is in Abidjan
  date: Date; // Date of the order
  deliveryLocation: string; // Delivery location
  isSaveLocation: boolean; // Whether to save the delivery location
  phoneNumber: string; // Contact phone number
  isPaymentDone: boolean; // Whether payment is completed
  isDeleted: boolean; // Soft delete flag
};

export type OrderModel = Model<TOrder>;
