// File: category.interface.ts
// Description: TypeScript interface for the Category module

import { Model, Types } from 'mongoose';

export type TProductInfo = {
  categoryId: Types.ObjectId; // Reference to the user placing the order
  name: string;
  price: number;
  description: string;
  quantity: number;
  available: number;
  attributed: number;
  images: string[];
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
};

export type ProductInfoModel = Model<TProductInfo>;
