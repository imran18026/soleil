// File: order.interface.ts
// Updated interface for Order module

import { Model, Types } from 'mongoose';

export type TOrder = {
  userId: Types.ObjectId; // Reference to the user placing the order
  productIds: string[]; // Reference to the product
  paymentId: Types.ObjectId; // Reference to the payment for this order
  quantity: number;
  totalAmount: number;
  status: 'New order' | 'In the procss' | 'Odrer delivered';
  isAbidjan: boolean;
  deliveryLocation: string;
  isSaveLocation: boolean;
  phoneNumber: string;
  ispaymentDone: boolean;
  isDeleted: boolean;
};

export type OrderModel = Model<TOrder>;
