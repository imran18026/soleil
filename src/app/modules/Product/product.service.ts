import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import { Category } from '../Category/category.model';
import { TProduct } from './product.interface';
import { Product } from './product.model';

/**
 * Add new product(s) with sequential product IDs.
 */
const addNewProduct = async (
  files: Express.Multer.File[],
  productData: Partial<TProduct> & { noOfProducts?: number },
): Promise<TProduct[] | any> => {
  const total = productData.noOfProducts || 1;
  delete productData.noOfProducts;

  const isCategoryExist = await Category.findById(productData.category);
  if (!isCategoryExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Upload images to Cloudinary
    if (!files)
      throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
    const uploadedImages =
      await FileUploadHelper.uploadMultipleToCloudinary(files);

    const ProductsArray: TProduct[] = [];

    const lastProduct = await Product.find({
      category: productData.category,
      addId: isCategoryExist.addId,
    });

    let lastNumber = lastProduct?.length || 0;
    // if (
    //   lastProduct &&
    //   lastProduct?.productId.startsWith(isCategoryExist.addId)
    // ) {
    //   lastNumber = parseInt(
    //     lastProduct.productId.replace(isCategoryExist.addId, ''),
    //     10,
    //   );
    // }

    if (total && typeof total === 'number')
      for (let i = 0; i < total; i++) {
        const productNumber = lastNumber + 1 + i;
        const productId = `${isCategoryExist.addId}${productNumber
          .toString()
          .padStart(5, '0')}`;

        const singleProduct: TProduct = { ...productData } as TProduct;
        singleProduct.productId = productId;
        singleProduct.qrCodeUrl = `http://localhost:5000/api/v1/qrcode/${productId}`;
        singleProduct.imageUlrs = uploadedImages;
        singleProduct.addId = isCategoryExist.addId;

        ProductsArray.push(singleProduct);
      }

    interface Idata {
      insertOne: {
        document: TProduct;
      };
    }

    await Category.findByIdAndUpdate(isCategoryExist._id,{
      $inc:{'quantity':total}
    })

    const bulkOps: Idata[] = ProductsArray.map((product) => ({
      insertOne: { document: product },
    }));

    const result = await Product.bulkWrite(bulkOps, { ordered: true });

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    // Rollback transaction in case of failure
    await session.abortTransaction();
    session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to create products, ${error}`,
    );
  }
  // return [];
};

/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['name', 'description']) // Searchable fields
    .filter(['category', 'isAvailable']) // Filterable fields
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return { meta, result };
};

/**
 * Get all available products.
 */
const getAvailableProducts = async () => {
  const products = await Product.find({ isAvailable: true, isDeleted: false });
  return products;
};

/**
 * Get a single product by ID.
 */
const getProductById = async (id: string): Promise<TProduct | null> => {
  const product = await Product.findById(id);
  return product;
};

/**
 * Update a product by ID.
 */
const updateProduct = async (
  id: string,
  data: Partial<TProduct>,
): Promise<TProduct | null> => {
  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return product;
};

/**
 * Soft delete a product by ID.
 */
const deleteProduct = async (id: string): Promise<TProduct | null> => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return product;
};

export const ProductService = {
  addNewProduct,
  getAllProducts,
  getAvailableProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
