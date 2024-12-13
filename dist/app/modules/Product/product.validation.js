"use strict";
// File: product.validation.ts
// Description: Zod schemas for Product module validation
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
// Validation schema for creating a product
// const createProductValidationSchema = z.object({
//   productName: z.string().min(1, 'Product name is required'),
//   description: z.string().min(1, 'Description is required'),
//   price: z.number().positive('Price must be greater than 0'),
//   category: z.string().min(1, 'Category ID is required'),
//   noOfProducts: z
//     .number()
//     .int()
//     .min(1, 'Number of products must be at least 1'),
// });
// Validation schema for updating a product
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().optional(), // Product name is optional for updates
        description: zod_1.z.string().optional(), // Description is optional
        category: zod_1.z.string().optional(), // Category ID is optional
        price: zod_1.z.number().positive('Price must be greater than 0').optional(), // Ensure price is positive
        quantity: zod_1.z.number().int().min(0).optional(), // Ensure quantity is a non-negative integer
        qrCodeUrl: zod_1.z.string().optional(), // QR code URL is optional
        imageUlrs: zod_1.z.array(zod_1.z.string()).optional(), // Image URLs are optional and should be an array of strings
        isHidden: zod_1.z.boolean().optional(), // isHidden is optional
        isDeleted: zod_1.z.boolean().optional(), // isDeleted is optional
    }),
});
exports.productValidations = {
    // createProductValidationSchema,
    updateProductValidationSchema,
};
