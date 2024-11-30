// File: product.interface.ts
// Description: TypeScript interface for Product module

import { Model, Types } from 'mongoose';

export type TProduct = {
  productName: string;
  productId: string; // Sequential ID based on category
  description: string;
  price: number;
  category: Types.ObjectId; // Reference to Category
  qrCodeUrl: string; // URL for QR code
  imageUlrs: string[]; // Cloudinary URLs for product images
  isHidden: boolean;
  isDeleted: boolean; // Soft delete flag
  addId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductModel = Model<TProduct>;
