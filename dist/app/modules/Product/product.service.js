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
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const fileUploadHelpers_1 = require("../../helpers/fileUploadHelpers");
const category_model_1 = require("../Category/category.model");
const product_model_1 = require("./product.model");
/**
 * Add new product(s) with sequential product IDs.
 */
const addNewProduct = (files, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const total = productData.noOfProducts || 1;
    delete productData.noOfProducts;
    const isCategoryExist = yield category_model_1.Category.findById(productData.category);
    if (!isCategoryExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Upload images to Cloudinary
        if (!files)
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Images are required');
        const uploadedImages = yield fileUploadHelpers_1.FileUploadHelper.uploadMultipleToCloudinary(files);
        const ProductsArray = [];
        const lastProduct = yield product_model_1.Product.find({
            category: productData.category,
            addId: isCategoryExist.addId,
        });
        let lastNumber = (lastProduct === null || lastProduct === void 0 ? void 0 : lastProduct.length) || 0;
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
                const singleProduct = Object.assign({}, productData);
                singleProduct.productId = productId;
                singleProduct.qrCodeUrl = `http://localhost:5000/api/v1/qrcode/${productId}`;
                singleProduct.imageUlrs = uploadedImages;
                singleProduct.addId = isCategoryExist.addId;
                ProductsArray.push(singleProduct);
            }
        yield category_model_1.Category.findByIdAndUpdate(isCategoryExist._id, {
            $inc: { 'quantity': total }
        });
        const bulkOps = ProductsArray.map((product) => ({
            insertOne: { document: product },
        }));
        const result = yield product_model_1.Product.bulkWrite(bulkOps, { ordered: true });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        // Rollback transaction in case of failure
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, `Failed to create products, ${error}`);
    }
    // return [];
});
/**
 * Get all products with filtering, sorting, and pagination.
 */
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
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
    const product = yield product_model_1.Product.findById(id);
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
    addNewProduct,
    getAllProducts,
    getAvailableProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
