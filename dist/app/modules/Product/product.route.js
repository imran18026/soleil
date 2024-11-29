"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const fileUploadHelpers_1 = require("../../helpers/fileUploadHelpers");
const product_validation_1 = require("./product.validation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/create-product', 
// auth(USER_ROLE.admin), // Authorization middleware
fileUploadHelpers_1.FileUploadHelper.upload.array('files', 5), // Multiple file uploads (limit: 5)
(req, res, next) => {
    req.body = product_validation_1.productValidations.createProductValidationSchema.parse(JSON.parse(req.body.data));
    return product_controller_1.ProductController.addNewProduct(req, res, next);
}, (0, validateRequest_1.default)(product_validation_1.productValidations.createProductValidationSchema), product_controller_1.ProductController.addNewProduct);
router.get('/', product_controller_1.ProductController.getProducts);
router.get('/available', product_controller_1.ProductController.getAvailableProducts);
router.get('/:id', product_controller_1.ProductController.getProductById);
router.patch('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN), // Only admins can update products
(0, validateRequest_1.default)(product_validation_1.productValidations.updateProductValidationSchema), // Validate request body for updating product
product_controller_1.ProductController.updateProduct);
router.delete('/:id', (0, auth_1.default)(user_constants_1.USER_ROLE.ADMIN), product_controller_1.ProductController.deleteProduct);
exports.ProductsRoutes = router;
