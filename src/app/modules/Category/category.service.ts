// File: category.service.ts
// Description: Service logic for the Category module
import { unlink } from 'fs/promises';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  categoryFilterableFields,
  categorySearchableFields,
} from './category.constant';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { Product } from '../Product/product.model';
import { ProductInfo } from '../ProductInfo/ProductInfo.model';
import { deleteFile } from '../../utils/fileHelper';

const addNewCategory = async (
  file: Express.Multer.File,
  data: Partial<TCategory>,
): Promise<TCategory> => {
  const isCategoryExist = await Category.findOne({
    $or: [{ addID: data?.addId }, { categoryName: data?.categoryName }],
  });

  const ImageUrl = file.path.replace('public\\', '');
  data.imageUrl = ImageUrl;

  if (isCategoryExist) {
    throw new AppError(httpStatus.CONFLICT, 'Category already exists');
  }

  const result = await Category.create(data);
  return result;
};

/**
 * Get all categories with filtering, sorting, and pagination.
 */
const getAllCategories = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(Category.find(), query)
    .search(categorySearchableFields) // Searchable fields
    .filter(categoryFilterableFields) // Filterable fields
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const result = await categoryQuery.modelQuery;
  return { meta, result };
};

const getProductsbyCategory = async (id: string) => {
  const productInfo = await ProductInfo.find({ categoryId: id });
  const productArray = [];
  for (let i = 0; i < productInfo.length; i++) {
    const product = await Product.find({
      productInfoId: productInfo[i]._id,
    }).populate('productInfoId');
    productArray.push(...product);
  }

  return productArray;

  // const uniqueProductNames = await Product.distinct('productName', {
  //   category: id,
  // });
  // const products = await Promise.all(
  //   uniqueProductNames.map(async (productName) => {
  //     return Product.findOne({
  //       category: id,
  //       productName,
  //       isSold: false,
  //       isDeleted: false,
  //       isHidden: false,
  //     });
  //   }),
  // );

  // const result = products.filter(Boolean); // remove any null values

  // return result;
};

/**
 * Get a single category by ID.
 */
const getCategoryById = async (id: string): Promise<TCategory | null> => {
  const category = await Category.findById(id);
  return category;
};

/**
 * Update a category by ID.
 */
const updateCategory = async (
  id: string,
  data: Partial<TCategory>,
  file?: Express.Multer.File,
): Promise<TCategory | null> => {
  const previous = await Category.findById(id);
  if (!previous) throw new Error('Category not found');
  console.log(previous.imageUrl);
  // console.log(file?.path);

  if (file?.path && previous?.imageUrl) {
    data.imageUrl = file.path.replace('public\\', '');
    unlink(`public/${previous.imageUrl}`);
  }

  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
  });
  return category;
};

/**
 * Soft delete a category by ID.
 */
const deleteCategory = async (id: string): Promise<TCategory | null> => {
  const category = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return category;
};

const deleteCategoryFromDB = async (id: string): Promise<TCategory | null> => {
  const previous = await Category.findById(id);

  if (!previous) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');

  const category = await Category.findByIdAndDelete(id, { new: true });
  return category;
};

export const CategoryService = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  getProductsbyCategory,
  updateCategory,
  deleteCategory,
  deleteCategoryFromDB,
};
