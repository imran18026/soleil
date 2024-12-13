// File: category.interface.ts
// Description: TypeScript interface for the Category module

import { Model } from 'mongoose';

export type TCategory = {
  categoryName: string; // Category name
  addId: string; // Additional ID for category
  imageUrl: string; // Image URL for category
  totalQuantity: number; // Quantity of items in this category
  available: number;
  attributed: number; //order
  isDeleted: boolean; // Soft delete flag
  createdAt: Date; // Timestamp for creation
  updatedAt: Date; // Timestamp for last update
};

export type CategoryModel = Model<TCategory>;
