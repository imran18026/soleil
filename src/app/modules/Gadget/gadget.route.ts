import express, { NextFunction, Request, Response } from 'express';
import { FileUploadHelper } from '../../helpers/fileUploadHelpers';
import { gadgetsValidations } from './gadget.validation';
import { GadgetsController } from './gadget.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

// Route to add contact details
router.post(
  '/add-contact',
  FileUploadHelper.upload.array('files', 2), // Adjust the number as per your requirement
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.addValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add video
router.post(
  '/add-video',
  FileUploadHelper.upload.array('files', 1),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.addValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add voice
router.post(
  '/add-voice',
  FileUploadHelper.upload.array('files', 1),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = gadgetsValidations.addValidationSchema.parse(
      JSON.parse(req.body.data),
    );
    return GadgetsController.addNewGadget(req, res, next);
  },
  validateRequest(gadgetsValidations.addValidationSchema),
  GadgetsController.addNewGadget,
);

// Route to add text
router.post(
  '/add-text',
  validateRequest(gadgetsValidations.addTextValidationSchema),
  GadgetsController.addNewGadget,
);

export const GadgetsRoutes = router;
