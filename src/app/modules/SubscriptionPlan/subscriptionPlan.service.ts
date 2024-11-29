import { SubscriptionPlan } from './subscriptionPlan.model';
import { TSubscriptionPlan } from './subscriptionPlan.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

/**
 * Service to create a new subscription plan
 */
const createSubscriptionPlan = async (
  data: TSubscriptionPlan,
): Promise<TSubscriptionPlan> => {
  const isPlanExist = await SubscriptionPlan.findOne({ name: data.name });
  if (isPlanExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Plan with this name already exists',
    );
  }

  const result = await SubscriptionPlan.create(data);
  return result;
};

/**
 * Service to get all subscription plans with query handling
 */
const getAllSubscriptionPlans = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(SubscriptionPlan.find(), query)
    .search(['name', 'planPower']) // Searchable fields
    .filter(['price', 'durationInDays', 'isActive']) // Filterable fields
    .sort()
    .paginate()
    .fields();

  const subscriptionPlans = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();

  return {
    subscriptionPlans,
    meta,
  };
};

/**
 * Service to get a single subscription plan by ID
 */
const getSubscriptionPlanById = async (
  id: string,
): Promise<TSubscriptionPlan | null> => {
  const result = await SubscriptionPlan.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  return result;
};

/**
 * Service to update a subscription plan
 */
const updateSubscriptionPlan = async (
  id: string,
  data: Partial<TSubscriptionPlan>,
): Promise<TSubscriptionPlan | null> => {
  const result = await SubscriptionPlan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  return result;
};

/**
 * Service to deactivate a subscription plan
 */
const deactivateSubscriptionPlan = async (
  id: string,
): Promise<TSubscriptionPlan | null> => {
  const result = await SubscriptionPlan.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  return result;
};
const deleteSubscriptionPlanFromDB = async (
  id: string,
): Promise<TSubscriptionPlan | null> => {
  const result = await SubscriptionPlan.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Plan not found');
  }
  return result;
};

export const SubscriptionPlanService = {
  createSubscriptionPlan,
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  deactivateSubscriptionPlan,
  deleteSubscriptionPlanFromDB,
};
