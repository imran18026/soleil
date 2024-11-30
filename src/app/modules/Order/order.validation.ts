// File: order.validation.ts
// Updated Zod validation for Order module

import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, 'User ID is required'),
    product: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    totalAmount: z
      .number()
      .min(0, 'Total amount must be greater than or equal to 0'),
    payment: z.string().optional(), // Optional payment ID
    status: z
      .enum(['New order', 'In the procss', 'Odrer delivered'])
      .optional(),
    isAbidjan: z.boolean().optional(),
    deliveryLocation: z.string().optional(),
    isSaveLocation: z.boolean().optional(),
    phoneNumber: z.string().optional(),
    ispaymentDone: z.boolean().optional(),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
};
