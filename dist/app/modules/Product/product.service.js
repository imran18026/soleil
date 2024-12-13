"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = require("./product.model");
/**
 * Add new product(s) with sequential product IDs.
 */
// const addNewProduct = async (
//   files: Express.Multer.File[],
//   productData: Partial<TProduct> & { noOfProducts?: number },
// ): Promise<TProduct[] | any> => {
//   const total = productData.noOfProducts || 1;
//   delete productData.noOfProducts;
//   const isCategoryExist = await Category.findById(productData.category);
//   if (!isCategoryExist) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
//   }
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     // Upload images to Cloudinary
//     if (!files)
//       throw new AppError(httpStatus.BAD_REQUEST, 'Images are required');
//     const uploadedImages =
//       await FileUploadHelper.uploadMultipleToCloudinary(files);
//     const ProductsArray: TProduct[] = [];
//     const lastProduct = await Product.find({
//       category: productData.category,
//       addId: isCategoryExist.addId,
//     });
//     let lastNumber = lastProduct?.length || 0;
//     // if (
//     //   lastProduct &&
//     //   lastProduct?.productId.startsWith(isCategoryExist.addId)
//     // ) {
//     //   lastNumber = parseInt(
//     //     lastProduct.productId.replace(isCategoryExist.addId, ''),
//     //     10,
//     //   );
//     // }
//     if (total && typeof total === 'number')
//       for (let i = 0; i < total; i++) {
//         const productNumber = lastNumber + 1 + i;
//         const productId = `${isCategoryExist.addId}${productNumber
//           .toString()
//           .padStart(5, '0')}`;
//         const singleProduct: TProduct = { ...productData } as TProduct;
//         singleProduct.productId = productId;
//         singleProduct.qrCodeUrl = `http://localhost:5000/api/v1/qrcode/${productId}`;
//         singleProduct.imageUlrs = uploadedImages;
//         singleProduct.addId = isCategoryExist.addId;
//         ProductsArray.push(singleProduct);
//       }
//     interface Idata {
//       insertOne: {
//         document: TProduct;
//       };
//     }
//     await Category.findByIdAndUpdate(isCategoryExist._id, {
//       $inc: { quantity: total, available: total },
//     });
//     const bulkOps: Idata[] = ProductsArray.map((product) => ({
//       insertOne: { document: product },
//     }));
//     const result = await Product.bulkWrite(bulkOps, { ordered: true });
//     await session.commitTransaction();
//     await session.endSession();
//     return result;
//   } catch (error) {
//     // Rollback transaction in case of failure
//     await session.abortTransaction();
//     session.endSession();
//     throw new AppError(
//       httpStatus.INTERNAL_SERVER_ERROR,
//       `Failed to create products, ${error}`,
//     );
//   }
//   // return [];
// };
/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAllProductUniquely = () => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = yield product_model_1.Product.aggregate([
        {
            $group: {
                _id: '$productName', // Group by productName
                productCount: { $sum: 1 }, // Count the number of products with the same name
                firstProduct: { $first: '$$ROOT' }, // Get the first product in the group
            },
        },
        {
            $project: {
                _id: 0, // Exclude the _id field
                productName: '$_id', // Rename _id to productName
                productCount: 1, // Include the count of products in the group
                firstProduct: 1, // Include the first product details in the group
            },
        },
        {
            $sort: { productCount: -1 }, // Optional: Sort by count in descending order
        },
    ]);
    console.log(productQuery);
    return productQuery;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find().populate('productInfoId'), query)
        .search(['name', 'description']) // Searchable fields
        .filter(['category', 'isAvailable']) // Filterable fields
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return { meta, result };
});
/**
 * Get all available products.
 */
const getAvailableProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.Product.find({ isAvailable: true, isDeleted: false });
    return products;
});
/**
 * Get a single product by ID.
 */
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id).populate('productInfoId');
    return product;
});
/**
 * Update a product by ID.
 */
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    return product;
});
/**
 * Soft delete a product by ID.
 */
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return product;
});
exports.ProductService = {
    // addNewProduct,
    getAllProducts,
    getAvailableProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProductUniquely,
};
