// File: category.validation.ts
// Description: Zod schemas for Category module validation

import { z } from 'zod';

const createProductInfoValidationSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const updateProductInfoValidationSchema = z.object({
  categoryId: z.string().min(1, 'Category ID is required').optional(),
  name: z.string().min(1, 'Product name is required').optional(),
  price: z.number().min(1, 'Price must be greater than 0').optional(),
});

export const productInfoValidations = {
  createProductInfoValidationSchema,
  updateProductInfoValidationSchema,
};
