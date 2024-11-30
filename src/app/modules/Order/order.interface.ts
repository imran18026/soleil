// File: order.interface.ts
// Updated interface for Order module

import { Model, Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId; // Reference to the user placing the order
  product: Types.ObjectId; // Reference to the product
  payment: Types.ObjectId | null; // Reference to the payment for this order
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
