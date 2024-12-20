// File: category.controller.ts
// Description: Controller logic for the Category module

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TCategory } from './category.interface';
import AppError from '../../error/AppError';

/**
 * Create a new category.
 */

const addNewCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData: Partial<TCategory> = req.body;
  const { file } = req;

  if (!file) throw new AppError(httpStatus.BAD_REQUEST, 'Image is required');

  const result = await CategoryService.addNewCategory(file, categoryData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

/**
 * Get all categories.
 */
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: categories.result,
    meta: categories.meta,
  });
});

const getProductsbyCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const resultData = await CategoryService.getProductsbyCategory(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products by category retrieved successfully!',
      data: resultData,
    });
  },
);

/**
 * Get a single category by ID.
 */
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.getCategoryById(id);
  if (!category) throw new Error('Category not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully!',
    data: category,
  });
});

/**
 * Update a category.
 */
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryData: Partial<TCategory> = req.body;
  const { file } = req;

  const category = await CategoryService.updateCategory(id, categoryData, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully!',
    data: category,
  });
});

/**
 * Soft delete a category.
 */
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.deleteCategory(id);
  if (!category) throw new Error('Category not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully!',
    data: category,
  });
});
const deleteCategoryFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.deleteCategoryFromDB(id);
  if (!category) throw new Error('Category not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully!',
    data: category,
  });
});

export const CategoryController = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  getProductsbyCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryFromDB,
};
