// File: category.validation.ts
// Description: Zod schemas for Category module validation

import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  categoryName: z.string().min(1, 'Category name is required'),
  addId: z.string().min(1, 'Add ID is required'),
});

const updateCategoryValidationSchema = z.object({
  categoryName: z.string().min(1, 'Category name is required').optional(),
  addId: z.string().min(1, 'Add ID is required').optional(),
});
// .strict(); // Reject extra fields

export const categoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
