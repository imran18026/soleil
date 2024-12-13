import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ProductService } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AppError from '../../error/AppError';

/**
 * Create a new product.
 */
// const addNewProduct = catchAsync(async (req: Request, res: Response) => {
//   const productData = req.body;
//   const files = req.files as Express.Multer.File[];

//   if (!files || !files.length) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
//   }

//   const result = await ProductService.addNewProduct(files, productData);

//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'New product(s) added successfully!',
//     data: result,
//   });
// });
/**
 * Get all products.
 */

const getAllProductUniquely = catchAsync(
  async (req: Request, res: Response) => {
    const products = await ProductService.getAllProductUniquely();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products retrieved successfully!',
      data: products,
    });
  },
);

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully!',
    data: products.result,
    meta: products.meta,
  });
});

/**
 * Get available products.
 */
const getAvailableProducts = catchAsync(async (req: Request, res: Response) => {
  const products = await ProductService.getAvailableProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available products retrieved successfully!',
    data: products,
  });
});

/**
 * Get a single product by ID.
 */
const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    data: product,
  });
});

/**
 * Update a product.
 */
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  const product = await ProductService.updateProduct(id, data);
  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: product,
  });
});

/**
 * Soft delete a product.
 */
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ProductService.deleteProduct(id);
  if (!product) throw new Error('Product not found');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: product,
  });
});

export const ProductController = {
  // addNewProduct,
  getProducts,
  getAvailableProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProductUniquely,
};
