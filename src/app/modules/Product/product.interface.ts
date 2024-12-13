// File: product.interface.ts
// Description: TypeScript interface for Product module

import { Model, Types } from 'mongoose';

export type TProduct = {
  productInfoId: Types.ObjectId; // Reference to Category
  uniqueId: string;
  addId: string;
  isSold: boolean;
  // createdAt: Date;
  // updatedAt: Date;
};

export type ProductModel = Model<TProduct>;
