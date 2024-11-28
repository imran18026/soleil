// File: category.model.ts
// Description: Mongoose schema and model for Category module

import { Schema, model } from 'mongoose';
import { TCategory, CategoryModel } from './category.interface';

const categorySchema = new Schema<TCategory, CategoryModel>(
  {
    categoryName: { type: String, required: true, unique: true },
    addId: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    quantity: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    attributed: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Category = model<TCategory, CategoryModel>(
  'Category',
  categorySchema,
);
