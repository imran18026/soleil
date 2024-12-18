// File: order.validation.ts
// Description: Zod validation schemas for Order module

import { z } from 'zod';

/**
 * Validation schema for creating an order
 */
const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    productInfoId: z.string().min(1, 'Product Info ID is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    isAbidjan: z.boolean(),
    deliveryLocation: z.string(),
    isSaveLocation: z.boolean(),
    phoneNumber: z.string(),
    deliveryCost: z.number().optional(),
  }),
});

/**
 * Validation schema for updating an order
 */
const updateOrderValidationSchema = z.object({
  body: z.object({
    productInfoId: z.string().optional(),
    quantity: z.number().min(1, 'Quantity must be at least 1').optional(),
    totalAmount: z
      .number()
      .min(0, 'Total amount must be greater than or equal to 0')
      .optional(),
    status: z
      .enum(['New order', 'In the process', 'Order delivered'])
      .optional(),
    deliveryLocation: z.string().optional(),
    isSaveLocation: z.boolean().optional(),
  }),
});

/**
 * Validation schema for updating order status
 */
const updateOrderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['New order', 'In the process', 'Order delivered']),
  }),
});

/**
 * Validation schema for updating payment status
 */
const updatePaymentStatusValidationSchema = z.object({
  body: z.object({
    orderPaymentStatus: z.enum(['pending', 'success', 'failed']),
    paymentId: z.string().optional(),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
  updateOrderStatusValidationSchema,
  updatePaymentStatusValidationSchema,
};
