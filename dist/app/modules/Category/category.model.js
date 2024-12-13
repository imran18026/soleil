"use strict";
// File: category.model.ts
// Description: Mongoose schema and model for Category module
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true, unique: true },
    addId: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    totalQuantity: { type: Number, default: 0 },
    available: { type: Number, default: 0 },
    attributed: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
