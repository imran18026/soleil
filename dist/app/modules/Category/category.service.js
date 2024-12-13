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
exports.CategoryService = void 0;
// File: category.service.ts
// Description: Service logic for the Category module
const promises_1 = require("fs/promises");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const category_constant_1 = require("./category.constant");
const category_model_1 = require("./category.model");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = require("../Product/product.model");
const ProductInfo_model_1 = require("../ProductInfo/ProductInfo.model");
const addNewCategory = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield category_model_1.Category.findOne({
        $or: [{ addID: data === null || data === void 0 ? void 0 : data.addId }, { categoryName: data === null || data === void 0 ? void 0 : data.categoryName }],
    });
    const ImageUrl = file.path.replace('public\\', '');
    data.imageUrl = ImageUrl;
    if (isCategoryExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Category already exists');
    }
    const result = yield category_model_1.Category.create(data);
    return result;
});
/**
 * Get all categories with filtering, sorting, and pagination.
 */
const getAllCategories = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryQuery = new QueryBuilder_1.default(category_model_1.Category.find(), query)
        .search(category_constant_1.categorySearchableFields) // Searchable fields
        .filter(category_constant_1.categoryFilterableFields) // Filterable fields
        .sort()
        .paginate()
        .fields();
    const meta = yield categoryQuery.countTotal();
    const result = yield categoryQuery.modelQuery;
    return { meta, result };
});
const getProductsbyCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const productInfo = yield ProductInfo_model_1.ProductInfo.find({ categoryId: id });
    const productArray = [];
    for (let i = 0; i < productInfo.length; i++) {
        const product = yield product_model_1.Product.find({
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
});
/**
 * Get a single category by ID.
 */
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findById(id);
    return category;
});
/**
 * Update a category by ID.
 */
const updateCategory = (id, data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const previous = yield category_model_1.Category.findById(id);
    if (!previous)
        throw new Error('Category not found');
    console.log(previous.imageUrl);
    // console.log(file?.path);
    if ((file === null || file === void 0 ? void 0 : file.path) && (previous === null || previous === void 0 ? void 0 : previous.imageUrl)) {
        data.imageUrl = file.path.replace('public\\', '');
        (0, promises_1.unlink)(`public/${previous.imageUrl}`);
    }
    const category = yield category_model_1.Category.findByIdAndUpdate(id, data, {
        new: true,
    });
    return category;
});
/**
 * Soft delete a category by ID.
 */
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return category;
});
const deleteCategoryFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const previous = yield category_model_1.Category.findById(id);
    if (!previous)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
    const category = yield category_model_1.Category.findByIdAndDelete(id, { new: true });
    return category;
});
exports.CategoryService = {
    addNewCategory,
    getAllCategories,
    getCategoryById,
    getProductsbyCategory,
    updateCategory,
    deleteCategory,
    deleteCategoryFromDB,
};
