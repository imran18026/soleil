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
const fileUploadHelpers_1 = require("../../helpers/fileUploadHelpers");
const AppError_1 = __importDefault(require("../../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const addNewCategory = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield category_model_1.Category.findOne({
        $or: [{ addID: data === null || data === void 0 ? void 0 : data.addId }, { categoryName: data === null || data === void 0 ? void 0 : data.categoryName }],
    });
    if (isCategoryExist && file.path) {
        yield (0, promises_1.unlink)(file.path);
        throw new Error('Category is already exists');
    }
    const uploadedImage = yield fileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
    if (uploadedImage) {
        data.imageUrl = uploadedImage.secure_url;
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
const updateCategory = (id, file, data) => __awaiter(void 0, void 0, void 0, function* () {
    const previous = yield category_model_1.Category.findById(id);
    if (!previous)
        throw new Error('Category not found');
    // console.log(previous);
    if (file.path && previous.imageUrl) {
        const uploadedImage = yield fileUploadHelpers_1.FileUploadHelper.uploadToCloudinary(file);
        if (uploadedImage) {
            data.imageUrl = uploadedImage.secure_url;
        }
        yield fileUploadHelpers_1.FileUploadHelper.deleteFromCloudinary(previous === null || previous === void 0 ? void 0 : previous.imageUrl);
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
    if (previous.imageUrl) {
        yield fileUploadHelpers_1.FileUploadHelper.deleteFromCloudinary(previous === null || previous === void 0 ? void 0 : previous.imageUrl);
    }
    const category = yield category_model_1.Category.findByIdAndDelete(id, { new: true });
    return category;
});
exports.CategoryService = {
    addNewCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteCategoryFromDB,
};
