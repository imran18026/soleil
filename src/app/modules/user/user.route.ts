import { Router } from 'express';
import auth from '../../middleware/auth';
import fileUpload from '../../middleware/fileUpload';
import parseData from '../../middleware/parseData';
import validateRequest from '../../middleware/validateRequest';
import { resentOtpValidations } from '../otp/otp.validation';
import { USER_ROLE } from './user.constants';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
const upload = fileUpload('./public/uploads/profile');

export const userRoutes = Router();

userRoutes
  .post(
    '/create',
    validateRequest(userValidation?.userValidationSchema),
    userController.createUser,
  )
  .post(
    '/create-user-verify-otp',
    validateRequest(resentOtpValidations.verifyOtpZodSchema),
    userController.userCreateVarification,
  )
  .get(
    '/my-profile',
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    userController.getMyProfile,
  )
  .get(
    '/all-users',
    // auth(USER_ROLE.ADMIN),
    userController.getAllUsers,
  )

  .get('/:id', userController.getUserById)

  .patch(
    '/update-my-profile',
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    upload.single('image'),
    parseData(),
    userController.updateMyProfile,
  )
  .delete(
    '/delete-my-account',
    auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER),
    userController.deleteMyAccount,
  )

  //soft delete
  .patch('/:id', auth(USER_ROLE.ADMIN), userController.blockedUser);
