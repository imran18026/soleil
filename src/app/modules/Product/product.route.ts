import express, { NextFunction, Request, Response } from 'express';
import { ProductController } from './product.controller';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import { productValidations } from './product.validation';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';

const router = express.Router();

// router.post(
//   '/create-product',
//   // auth(USER_ROLE.admin), // Authorization middleware
//   FileUploadHelper.upload.array('files', 5), // Multiple file uploads (limit: 5)
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = productValidations.createProductValidationSchema.parse(
//       JSON.parse(req.body.data),
//     );
//     return ProductController.addNewProduct(req, res, next);
//   },
//   validateRequest(productValidations.createProductValidationSchema),
//   ProductController.addNewProduct,
// );
router.get('/', ProductController.getProducts);
router.get('/unique', ProductController.getAllProductUniquely);

router.get('/available', ProductController.getAvailableProducts);

router.get('/:id', ProductController.getProductById);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN), // Only admins can update products
  validateRequest(productValidations.updateProductValidationSchema), // Validate request body for updating product
  ProductController.updateProduct, // Call the controller to handle product update
);

router.delete('/:id', auth(USER_ROLE.ADMIN), ProductController.deleteProduct);

export const ProductsRoutes = router;
