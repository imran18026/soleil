     import { z } from 'zod';

const createSubscriptionPlanSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Plan name is required'),
    description: z.string().optional(),
    price: z.number().min(1, 'Price must be greater than 0'),
    duration: z
      .number()
      .min(2, 'Minimum duration is 2 days')
      .refine((val) => Number.isInteger(val), 'Duration must be an integer'),
    features: z
      .array(z.string())
      .min(1, 'At least one feature must be specified'),
  }),
});

const updateSubscriptionPlanSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(1).optional(),
    duration: z
      .number()
      .min(2)
      .optional()
      .refine((val) => Number.isInteger(val), 'Duration must be an integer'),
    features: z.array(z.string()).optional(),
  }),
});

export const subscriptionPlanValidation = {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
};
