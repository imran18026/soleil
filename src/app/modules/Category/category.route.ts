// File: category.routes.ts
// Description: Express routes for Category module

import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';
import { CategoryController } from './category.controller';
import { categoryValidations } from './category.validation';

const router = express.Router();

router.post(
  '/create-category',
  // auth(USER_ROLE.admin),
  FileUploadHelper.upload.single('file'), // Single image upload
  (req: Request, res: Response, next: NextFunction) => {
    req.body = categoryValidations.createCategoryValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return CategoryController.addNewCategory(req, res, next);
  },
  validateRequest(categoryValidations.createCategoryValidationSchema),
  CategoryController.addNewCategory,
);

router.get('/', CategoryController.getCategories);

router.get('/products/:id',CategoryController.getProductsbyCategory)

router.get('/:id', CategoryController.getCategoryById);

router.patch(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  FileUploadHelper.upload.single('file'), // Single image upload
  (req: Request, res: Response, next: NextFunction) => {
    req.body = categoryValidations.updateCategoryValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return CategoryController.updateCategory(req, res, next);
  },
  validateRequest(categoryValidations.updateCategoryValidationSchema),
  CategoryController.updateCategory,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.CUSTOMER),
  CategoryController.deleteCategory,
);

router.delete(
  '/DB/:id',
  // auth(USER_ROLE.CUSTOMER),
  CategoryController.deleteCategoryFromDB,
);

export const CategoryRoutes = router;
