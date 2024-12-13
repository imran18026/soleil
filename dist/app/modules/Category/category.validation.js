"use strict";
// File: category.validation.ts
// Description: Zod schemas for Category module validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidations = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    categoryName: zod_1.z.string().min(1, 'Category name is required'),
    addId: zod_1.z.string().min(1, 'Add ID is required'),
});
const updateCategoryValidationSchema = zod_1.z.object({
    categoryName: zod_1.z.string().min(1, 'Category name is required').optional(),
    addId: zod_1.z.string().min(1, 'Add ID is required').optional(),
});
// .strict(); // Reject extra fields
exports.categoryValidations = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
