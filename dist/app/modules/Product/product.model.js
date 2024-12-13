"use strict";
// File: product.model.ts
// Description: Mongoose model for Product module
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productInfoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProductInfo',
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },
    addId: {
        type: String,
        required: true,
    },
    isSold: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
