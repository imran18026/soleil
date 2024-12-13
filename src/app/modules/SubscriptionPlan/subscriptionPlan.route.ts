import express from 'express';
import { SubscriptionPlanController } from './subscriptionPlan.controller';

import validateRequest from '../../middleware/validateRequest';
import { subscriptionPlanValidation } from './subscriptionPlan.validation';

const router = express.Router();

// Create a new subscription plan
router.post(
  '/create-plan',
  // auth(USER_ROLE.ADMIN), // Authorization for admin
  // validateRequest(subscriptionPlanValidation.createSubscriptionPlanSchema),
  SubscriptionPlanController.createSubscriptionPlan,
);

// Get all subscription plans
router.get(
  '/',
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), // Accessible by admins and customers
  SubscriptionPlanController.getAllSubscriptionPlans,
);

// Get a single subscription plan by ID
router.get(
  '/:id',
  // auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), // Accessible by admins and customers
  SubscriptionPlanController.getSubscriptionPlanById,
);

// Update a subscription plan
router.patch(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization for admin
  validateRequest(subscriptionPlanValidation.updateSubscriptionPlanSchema),
  SubscriptionPlanController.updateSubscriptionPlan,
);

// Deactivate a subscription plan
router.patch(
  '/:id',
  // auth(USER_ROLE.ADMIN), // Authorization for admin
  SubscriptionPlanController.deactivateSubscriptionPlan,
);
router.delete(
  '/db/:id',
  // auth(USER_ROLE.ADMIN), // Authorization for admin
  SubscriptionPlanController.deleteSubscriptionPlanFromDB,
);

export const SubscriptionPlanRoutes = router;
