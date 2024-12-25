// File: category.routes.ts
// Description: Express routes for Category module

import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import validateRequest from '../../middleware/validateRequest';
import { productInfoValidations } from './productInfo.validation';
import { ProductInfoController } from './productInfo.controller';

const router = express.Router();

router.post(
  '/add-products',
  // auth(USER_ROLE.admin),
  FileUploadHelper.upload.array('files', 5), //multiple image upload max 5
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productInfoValidations.createProductInfoValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ProductInfoController.addNewProduct(req, res, next);
  },
  validateRequest(productInfoValidations.createProductInfoValidationSchema),
  ProductInfoController.addNewProduct,
);

router.post(
  '/add-quantity/:id',
  // auth(USER_ROLE.admin),
  ProductInfoController.addQuantity,
);
router.get('/', ProductInfoController.getAllProductsInfo);

router.patch(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  FileUploadHelper.upload.array('files', 5), // Single image upload
  (req: Request, res: Response, next: NextFunction) => {
    req.body = productInfoValidations.updateProductInfoValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return ProductInfoController.updateProductInfo(req, res, next);
  },
  validateRequest(productInfoValidations.updateProductInfoValidationSchema),
  ProductInfoController.updateProductInfo,
);

router.patch(
  '/hide/:id',
  // auth(USER_ROLE.ADMIN),
  ProductInfoController.hideProduct,
);

router.get('/category-products/:id', ProductInfoController.getProductsbyCategory);

router.get('/:id', ProductInfoController.getproductInfoById);
router.get('/category/:id', ProductInfoController.getproductInfoByCategory);

// router.patch(
//   '/:id',
//   // auth(USER_ROLE.ADMIN),
//   FileUploadHelper.upload.single('file'), // Single image upload
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = categoryValidations.updateCategoryValidationSchema.parse(
//       JSON.parse(req.body.data),
//     );
//     return CategoryController.updateCategory(req, res, next);
//   },
//   validateRequest(categoryValidations.updateCategoryValidationSchema),
//   CategoryController.updateCategory,
// );

// router.delete(
//   '/:id',
//   // auth(USER_ROLE.CUSTOMER),
//   CategoryController.deleteCategory,
// );

// router.delete(
//   '/DB/:id',
//   // auth(USER_ROLE.CUSTOMER),
//   CategoryController.deleteCategoryFromDB,
// );

export const ProductInfoRoutes = router;
