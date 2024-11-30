import { z } from 'zod';

// Main Zod schema for withdrawal validation
export const paymentSchema = z.object({
  userId: z.string().min(1, 'Mentor ID is required.'),
  productId: z.string().min(1, 'Mentor ID is required.'),
  method: z.enum(['bank', 'paypal_pay', 'bank_transfer']),
  status: z.enum(['pending', 'success', 'failed']).default('pending'),
  transactionId: z.string().min(1, 'Transaction ID is required.'),
  transactionDate: z.date().default(() => new Date()),
});

export const paymentValidation = {
  paymentSchema,
};
