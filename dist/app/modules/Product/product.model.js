"use strict";
// File: product.model.ts
// Description: Mongoose model for Product module
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    qrCodeUrl: { type: String, required: true },
    imageUlrs: [{ type: String, required: true }],
    addId: { type: String, required: true },
    isSold: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
