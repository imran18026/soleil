"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/create-product', 
// auth(USER_ROLE.admin), // Authorization middleware
FileUploadHelper_1.FileUploadHelper.upload.array('files', 5), // Multiple file uploads (limit: 5)
(req, res, next) => {
    req.body = product_validation_1.productValidations.createProductValidationSchema.parse(JSON.parse(req.body.data));
    return product_controller_1.ProductController.addNewProduct(req, res, next);
}, (0, validateRequest_1.default)(product_validation_1.productValidations.createProductValidationSchema), product_controller_1.ProductController.addNewProduct);
router.get('/', product_controller_1.ProductController.getProducts);
router.get('/available', product_controller_1.ProductController.getAvailableProducts);
router.get('/:id', product_controller_1.ProductController.getProductById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), // Only admins can update products
(0, validateRequest_1.default)(product_validation_1.productValidations.updateProductValidationSchema), // Validate request body for updating product
product_controller_1.ProductController.updateProduct);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), product_controller_1.ProductController.deleteProduct);
exports.ProductsRoutes = router;
