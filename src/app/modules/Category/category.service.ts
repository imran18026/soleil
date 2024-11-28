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

const addNewCategory = async (
  file: Express.Multer.File,
  data: Partial<TCategory>,
): Promise<TCategory> => {
  const isCategoryExist = await Category.findOne({
    $or: [{ addID: data?.addId }, { categoryName: data?.categoryName }],
  });

  if (isCategoryExist && file.path) {
    await unlink(file.path);
    throw new Error('Category is already exists');
  }

  const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
  if (uploadedImage) {
    data.imageUrl = uploadedImage.secure_url;
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
  file: Express.Multer.File,
  data: Partial<TCategory>,
): Promise<TCategory | null> => {
  const previous = await Category.findById(id);
  if (!previous) throw new Error('Category not found');
  // console.log(previous);
  if (file.path && previous.imageUrl) {
    const uploadedImage = await FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
      data.imageUrl = uploadedImage.secure_url;
    }
    await FileUploadHelper.deleteFromCloudinary(previous?.imageUrl);
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

  if (previous.imageUrl) {
    await FileUploadHelper.deleteFromCloudinary(previous?.imageUrl);
  }
  const category = await Category.findByIdAndDelete(id, { new: true });
  return category;
};

export const CategoryService = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteCategoryFromDB,
};
