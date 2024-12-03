"use strict";
// File: category.routes.ts
// Description: Express routes for Category module
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploadHelpers_1 = require("../../helpers/fileUploadHelpers");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/create-category', 
// auth(USER_ROLE.admin),
fileUploadHelpers_1.FileUploadHelper.upload.single('file'), // Single image upload
(req, res, next) => {
    req.body = category_validation_1.categoryValidations.createCategoryValidationSchema.parse(JSON.parse(req.body.data));
    return category_controller_1.CategoryController.addNewCategory(req, res, next);
}, (0, validateRequest_1.default)(category_validation_1.categoryValidations.createCategoryValidationSchema), category_controller_1.CategoryController.addNewCategory);
router.get('/', category_controller_1.CategoryController.getCategories);
router.get('/products/:id', category_controller_1.CategoryController.getProductsbyCategory);
router.get('/:id', category_controller_1.CategoryController.getCategoryById);
router.patch('/:id', 
// auth(USER_ROLE.ADMIN),
fileUploadHelpers_1.FileUploadHelper.upload.single('file'), // Single image upload
(req, res, next) => {
    req.body = category_validation_1.categoryValidations.updateCategoryValidationSchema.parse(JSON.parse(req.body.data));
    return category_controller_1.CategoryController.updateCategory(req, res, next);
}, (0, validateRequest_1.default)(category_validation_1.categoryValidations.updateCategoryValidationSchema), category_controller_1.CategoryController.updateCategory);
router.delete('/:id', 
// auth(USER_ROLE.CUSTOMER),
category_controller_1.CategoryController.deleteCategory);
router.delete('/DB/:id', 
// auth(USER_ROLE.CUSTOMER),
category_controller_1.CategoryController.deleteCategoryFromDB);
exports.CategoryRoutes = router;
