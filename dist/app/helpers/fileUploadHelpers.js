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
exports.FileUploadHelper = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../error/AppError"));
const config_1 = __importDefault(require("../config"));
// Cloudinary configuration
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudunary_cloud_name,
    api_key: config_1.default.cloudunary_api_key,
    api_secret: config_1.default.cloudunary_api_secret,
});
const extractPublicIdFromUrl = (url) => {
    const regex = /\/upload\/v\d+\/(.*?)(?=\.\w+$)/;
    const matches = url.match(regex);
    return matches ? matches[1] : null; // Return the public ID or null if not found
};
// Multer configuration for file storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Temporary upload folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
    },
});
// Multer middleware for single and multiple file uploads
const upload = (0, multer_1.default)({ storage: storage });
// Function to upload a single file to Cloudinary
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            fs_1.default.unlinkSync(file.path); // Remove file from local storage
            if (error) {
                reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
            else {
                resolve(result); // Cloudinary response
            }
        });
    });
});
// Function to delete a file from Cloudinary by its public ID
const deleteFromCloudinary = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const publicId = extractPublicIdFromUrl(url);
    if (!publicId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid file URL');
    }
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
            else if (result.result !== 'ok') {
                reject(new AppError_1.default(http_status_1.default.BAD_REQUEST, `Failed to delete file: ${result.result}`));
            }
            else {
                resolve('File deleted successfully');
            }
        });
    });
});
// Function to upload multiple files to Cloudinary
const uploadMultipleToCloudinary = (files) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadPromises = files.map((file) => new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            fs_1.default.unlinkSync(file.path); // Remove the file from local storage
            if (error) {
                reject(error);
            }
            else {
                resolve(result.secure_url); // Return the uploaded image's URL
            }
        });
    }));
    return Promise.all(uploadPromises); // Wait for all uploads to complete
});
exports.FileUploadHelper = {
    upload, // Multer middleware
    uploadToCloudinary, // Single file upload
    uploadMultipleToCloudinary, // Multiple file uploads
    deleteFromCloudinary,
};
