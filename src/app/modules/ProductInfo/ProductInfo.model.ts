// File: category.model.ts
// Description: Mongoose schema and model for Category module

import { Schema, model } from 'mongoose';
import { ProductInfoModel, TProductInfo } from './productInfo.interface';
const productInfoSchema = new Schema<TProductInfo, ProductInfoModel>(
  {
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    attributed: { type: Number, default: 0 },
    images: { type: [String], required: true },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const ProductInfo = model<TProductInfo, ProductInfoModel>(
  'ProductInfo',
  productInfoSchema,
);
