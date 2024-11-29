import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { SubscriptionPlanService } from './subscriptionPlan.service';
import catchAsync from '../../utils/catchAsync';

/**
 * Controller to create a new subscription plan
 */
const createSubscriptionPlan = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await SubscriptionPlanService.createSubscriptionPlan(data);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Subscription plan created successfully!',
      data: result,
    });
  },
);

/**
 * Controller to get all subscription plans with query handling
 */
const getAllSubscriptionPlans = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionPlanService.getAllSubscriptionPlans(
      req.query,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plans retrieved successfully!',
      data: result.subscriptionPlans,
      meta: result.meta,
    });
  },
);

/**
 * Controller to get a single subscription plan by ID
 */
const getSubscriptionPlanById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubscriptionPlanService.getSubscriptionPlanById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan retrieved successfully!',
      data: result,
    });
  },
);

/**
 * Controller to update a subscription plan
 */
const updateSubscriptionPlan = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const result = await SubscriptionPlanService.updateSubscriptionPlan(
      id,
      data,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan updated successfully!',
      data: result,
    });
  },
);

/**
 * Controller to deactivate a subscription plan
 */
const deactivateSubscriptionPlan = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SubscriptionPlanService.deactivateSubscriptionPlan(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan deactivated successfully!',
      data: result,
    });
  },
);
const deleteSubscriptionPlanFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SubscriptionPlanService.deleteSubscriptionPlanFromDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Subscription plan deleted successfully!',
      data: result,
    });
  },
);

export const SubscriptionPlanController = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deactivateSubscriptionPlan,
  deleteSubscriptionPlanFromDB,
};
