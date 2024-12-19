import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import { gadgetsValidations } from './gadget.validation';
import { GadgetsController } from './gadget.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// Route to add contact details
router.patch(
  '/add-contact/:id',
  FileUploadHelper.upload.array('files', 2), // Adjust the number as per your requirement
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.updateValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.updateValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add video
router.patch(
  '/add-video/:id',
  FileUploadHelper.upload.array('files', 1),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.updateValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.updateValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add voice
router.patch(
  '/add-voice/:id',
  FileUploadHelper.upload.array('files', 1),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.updateValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.updateValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add text
router.patch(
  '/add-text/:id',
  validateRequest(gadgetsValidations.updateValidationSchema),
  GadgetsController.addNewGadget,
);

export const GadgetsRoutes = router;
