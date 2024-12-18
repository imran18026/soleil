// File: category.controller.ts
// Description: Controller logic for the Category module

import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import AppError from '../../error/AppError';
import { ProductInfoService } from './productInfo.service';
import { TProductInfo } from './productInfo.interface';

/**
 * Create a new category.
 */

const addNewProduct = catchAsync(async (req: Request, res: Response) => {
  const productData: Partial<TProductInfo> = req.body;
  const files = req.files as Express.Multer.File[];

  if (!files || !files.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
  }
  // console.log(productData);

  const result = await ProductInfoService.addNewProduct(files, productData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New product(s) added successfully!',
    data: result,
  });
});

const addQuantity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  // const data = await

  const result = await ProductInfoService.addQuantity(id, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quantity added successfully!',
    data: result,
  });
});

/**
 * Get all categories.
 */
const getAllProductsInfo = catchAsync(async (req: Request, res: Response) => {
  const categories = await ProductInfoService.getAllProductsInfo(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: categories.result,
    meta: categories.meta,
  });
});

const hideProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductInfoService.hideProduct(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product hidden successfully!',
    data: result,
  });
});

const updateProductInfo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const productData: Partial<TProductInfo> = req.body;
  const files = req.files as Express.Multer.File[];

  if (!files || !files.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
  }
  // console.log(productData);

  const result = await ProductInfoService.updateProductInfo(
    id,
    files,
    productData,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'New product(s) added successfully!',
    data: result,
  });
});

// const getProductsbyCategory = catchAsync(
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const resultData = await CategoryService.getProductsbyCategory(id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Products by category retrieved successfully!',
//       data: resultData,
//     });
//   },
// );

// /**
//  * Get a single category by ID.
//  */
const getproductInfoById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await ProductInfoService.getproductInfoById(id);
  if (!category) throw new Error('Category not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    data: category,
  });
});

// /**
//  * Update a category.
//  */
// const updateCategory = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const categoryData: Partial<TCategory> = req.body;
//   const { file } = req;
//   if (!file) throw new AppError(httpStatus.BAD_REQUEST, 'Image is required');
//   const category = await CategoryService.updateCategory(id, file, categoryData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category updated successfully!',
//     data: category,
//   });
// });

// /**
//  * Soft delete a category.
//  */
// const deleteCategory = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const category = await CategoryService.deleteCategory(id);
//   if (!category) throw new Error('Category not found');

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully!',
//     data: category,
//   });
// });
// const deleteCategoryFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const category = await CategoryService.deleteCategoryFromDB(id);
//   if (!category) throw new Error('Category not found');

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Category deleted successfully!',
//     data: category,
//   });
// });

export const ProductInfoController = {
  addNewProduct,
  getAllProductsInfo,
  getproductInfoById,
  // getProductsbyCategory,
  // updateCategory,
  // deleteCategory,
  // deleteCategoryFromDB,
  addQuantity,
  hideProduct,
  updateProductInfo,
};
