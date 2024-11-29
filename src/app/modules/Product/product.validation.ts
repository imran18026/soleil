// File: product.validation.ts
// Description: Zod schemas for Product module validation

import { z } from 'zod';

// Validation schema for creating a product
const createProductValidationSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be greater than 0'),
  category: z.string().min(1, 'Category ID is required'),
  noOfProducts: z
    .number()
    .int()
    .min(1, 'Number of products must be at least 1'),
});

// Validation schema for updating a product
const updateProductValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(), // Product name is optional for updates
    description: z.string().optional(), // Description is optional
    category: z.string().optional(), // Category ID is optional
    price: z.number().positive('Price must be greater than 0').optional(), // Ensure price is positive
    quantity: z.number().int().min(0).optional(), // Ensure quantity is a non-negative integer
    qrCodeUrl: z.string().optional(), // QR code URL is optional
    imageUlrs: z.array(z.string()).optional(), // Image URLs are optional and should be an array of strings
    isHidden: z.boolean().optional(), // isHidden is optional
    isDeleted: z.boolean().optional(), // isDeleted is optional
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
