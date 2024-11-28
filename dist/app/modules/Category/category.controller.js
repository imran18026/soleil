"use strict";
// File: category.controller.ts
// Description: Controller logic for the Category module
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
exports.CategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const category_service_1 = require("./category.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../error/AppError"));
/**
 * Create a new category.
 */
const addNewCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const { file } = req;
    if (!file)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Image is required');
    const result = yield category_service_1.CategoryService.addNewCategory(file, categoryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Category created successfully!',
        data: result,
    });
}));
/**
 * Get all categories.
 */
const getCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_service_1.CategoryService.getAllCategories(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Categories retrieved successfully!',
        data: categories.result,
        meta: categories.meta,
    });
}));
/**
 * Get a single category by ID.
 */
const getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_service_1.CategoryService.getCategoryById(id);
    if (!category)
        throw new Error('Category not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category retrieved successfully!',
        data: category,
    });
}));
/**
 * Update a category.
 */
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoryData = req.body;
    const { file } = req;
    if (!file)
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Image is required');
    const category = yield category_service_1.CategoryService.updateCategory(id, file, categoryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category updated successfully!',
        data: category,
    });
}));
/**
 * Soft delete a category.
 */
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_service_1.CategoryService.deleteCategory(id);
    if (!category)
        throw new Error('Category not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category deleted successfully!',
        data: category,
    });
}));
const deleteCategoryFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_service_1.CategoryService.deleteCategoryFromDB(id);
    if (!category)
        throw new Error('Category not found');
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category deleted successfully!',
        data: category,
    });
}));
exports.CategoryController = {
    addNewCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteCategoryFromDB,
};
