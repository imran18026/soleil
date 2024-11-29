// File: product.model.ts
// Description: Mongoose model for Product module

import { Schema, model } from 'mongoose';
import { ProductModel, TProduct } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    productName: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    qrCodeUrl: { type: String, required: true },
    imageUlrs: [{ type: String, required: true }],
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Product = model<TProduct, ProductModel>('Product', productSchema);
