// File: category.service.ts
// Description: Service logic for the Category module
import QueryBuilder from '../../builder/QueryBuilder';

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Product } from '../Product/product.model';

import mongoose from 'mongoose';
import { Category } from '../Category/category.model';
import { TProduct } from '../Product/product.interface';
import { TProductInfo } from './productInfo.interface';
import { ProductInfo } from './productInfo.model';

//add new product
const addNewProduct = async (
  files: Express.Multer.File[],
  data: Partial<TProductInfo>,
): Promise<TProductInfo | any> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const isExist = await ProductInfo.findOne({ name: data.name });
    if (isExist) {
      throw new Error('Product is already exist');
    }

    const category = await Category.findById(data.categoryId);

    if (!category) {
      throw new Error('Category not found');
    }
    data.images = files.map((file) => file.path.replace('public\\', ''));

    const result = await ProductInfo.create([data], { session });

    await Category.findByIdAndUpdate(
      data.categoryId,
      {
        $inc: {
          totalQuantity: Number(data.quantity),
          available: Number(data.quantity),
        },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    const ProductsArray: TProduct[] = [];

    const Products = await Product.find({ addId: category?.addId });
    const lastId = Products.length;

    for (let i = 0; i < Number(data.quantity); i++) {
      const productNumber = lastId + 1 + i;
      const productId = `${category?.addId}${productNumber
        .toString()
        .padStart(5, '0')}`;
      // console.log(productId);
      const product = { uniqueId: productId };

      let singleProduct: TProduct = { ...product } as TProduct;
      singleProduct.productInfoId = result[0].id;
      singleProduct.addId = category?.addId as string;
      ProductsArray.push(singleProduct);
    }

    interface Idata {
      insertOne: {
        document: TProduct;
      };
    }

    const bulkOps: Idata[] = ProductsArray.map((product) => ({
      insertOne: { document: product },
    }));

    const result2 = await Product.bulkWrite(bulkOps, {
      ordered: true,
      session,
    });

    await session.commitTransaction();
    return {
      ProdictDetails: result,
      products: result2,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
const updateProductInfo = async (
  id: string,
  files: Express.Multer.File[],
  data: Partial<TProductInfo>,
): Promise<TProductInfo | any> => {
  // console.log(data, files);
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const product = await ProductInfo.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const category = await Category.findById(data.categoryId);

    if (!category) {
      throw new Error('Category not found');
    }
    data.categoryId = category.id;
    data.images = files.map((file) => file.path.replace('public\\', ''));

    // console.log(id, data);

    const result = await ProductInfo.findByIdAndUpdate(id, data, {
      session,
      new: true,
    });

    await session.commitTransaction();
    return {
      ProdictDetails: result,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

//add quantity

const addQuantity = async (id: string, quantity: number) => {
  const productinfo = await ProductInfo.findById(id);
  if (!productinfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const categoryData = await Category.findById(productinfo.categoryId);
  if (!categoryData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    await ProductInfo.findByIdAndUpdate(
      id,
      {
        $inc: { quantity: Number(quantity), available: Number(quantity) },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    await Category.findByIdAndUpdate(
      productinfo.categoryId,
      {
        $inc: { totalQuantity: Number(quantity), available: Number(quantity) },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    // console.log(categoryData?.totalQuantity, quantity);
    const product = await ProductInfo.findById(id);

    const category = await Category.findById(product?.categoryId);

    const lastId = categoryData?.totalQuantity + 1;
    // console.log(lastId);

    const ProductsArray: TProduct[] = [];
    for (let i = 0; i < Number(quantity); i++) {
      const productNumber = lastId + i;

      const productId = `${category?.addId}${productNumber
        .toString()
        .padStart(5, '0')}`;
      // console.log(productId);
      const product = { uniqueId: productId };

      let singleProduct: TProduct = { ...product } as TProduct;
      singleProduct.productInfoId = new mongoose.Types.ObjectId(id);
      singleProduct.addId = category?.addId as string;
      ProductsArray.push(singleProduct);
    }

    interface Idata {
      insertOne: {
        document: TProduct;
      };
    }

    const bulkOps: Idata[] = ProductsArray.map((product) => ({
      insertOne: { document: product },
    }));

    const result2 = await Product.bulkWrite(bulkOps, {
      ordered: true,
      session,
    });

    await session.commitTransaction();

    const product2 = await ProductInfo.findById(id);
    return {
      ProdictDetails: product2,
      products: result2,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

/**
 * Get all categories with filtering, sorting, and pagination.
 */

const hideProduct = async (id: string) => {
  const result = await ProductInfo.findByIdAndUpdate(
    id,
    { isHidden: true },
    { new: true },
  );
  return result;
};

const getAllProductsInfo = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(
    ProductInfo.find().populate('categoryId'),
    query,
  )
    .search([]) // Searchable fields
    .filter([]) // Filterable fields
    .sort()
    .paginate()
    .fields();

  const meta = await categoryQuery.countTotal();
  const result = await categoryQuery.modelQuery;
  return { meta, result };
};

const getProductsbyCategory = async (id: string) => {
  const uniqueProductNames = await Product.distinct('productName', {
    category: id,
  });
  const products = await Promise.all(
    uniqueProductNames.map(async (productName) => {
      return Product.findOne({
        category: id,
        productName,
        isSold: false,
        isDeleted: false,
        isHidden: false,
      });
    }),
  );

  const result = products.filter(Boolean); // remove any null values

  return result;
};

/**
 * Get a single category by ID.
 */
const getproductInfoById = async (id: string): Promise<TProductInfo | null> => {
  const Product = await ProductInfo.findById(id);
  return Product;
};

/**
 * Update a category by ID.
 */
// const updateCategory = async (
//   id: string,
//   file: Express.Multer.File,
//   data: Partial<TCategory>,
// ): Promise<TCategory | null> => {
//   const previous = await Category.findById(id);
//   if (!previous) throw new Error('Category not found');

//   const category = await Category.findByIdAndUpdate(id, data, {
//     new: true,
//   });
//   return category;
// };

// /**
//  * Soft delete a category by ID.
//  */
// const deleteCategory = async (id: string): Promise<TCategory | null> => {
//   const category = await Category.findByIdAndUpdate(
//     id,
//     { isDeleted: true },
//     { new: true },
//   );
//   return category;
// };

// const deleteCategoryFromDB = async (id: string): Promise<TCategory | null> => {
//   const previous = await Category.findById(id);

//   if (!previous) throw new AppError(httpStatus.NOT_FOUND, 'Category not found');

//   const category = await Category.findByIdAndDelete(id, { new: true });
//   return category;
// };

export const ProductInfoService = {
  addNewProduct,
  getAllProductsInfo,
  getproductInfoById,
  getProductsbyCategory,
  // updateCategory,
  // deleteCategory,
  // deleteCategoryFromDB,
  addQuantity,
  hideProduct,
  updateProductInfo,
};
