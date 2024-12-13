// File: product.model.ts
// Description: Mongoose model for Product module

import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    productInfoId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductInfo',
      required: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
    },
    addId: {
      type: String,
      required: true,
    },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Product = model<TProduct, ProductModel>('Product', productSchema);
