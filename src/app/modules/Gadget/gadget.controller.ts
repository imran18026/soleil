import { Request, Response } from 'express';
import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

import AppError from '../../error/AppError';
import { TGadgets } from './gadget.interface';
import { GadgetsService } from './gadget.service';

/**
 * Add new gadget with contact details, text, video, etc.
 */
const addNewGadget = catchAsync(async (req: Request, res: Response) => {
  const gadgetData: Partial<TGadgets> = req.body;
  let files = req.files as Express.Multer.File[];
  const { id } = req.params;

  if (!files) {
    // throw new AppError(httpStatus.BAD_REQUEST, 'file are required');
    files = [];
  }
  const result = await GadgetsService.addNewGadget(id, files, gadgetData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Gadget added successfully!',
    data: result,
  });
});

/**
 * Get all gadgets with filtering and pagination.
 */
const getAllGadgets = catchAsync(async (req: Request, res: Response) => {
  const gadgets = await GadgetsService.getAllGadgets(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Gadgets retrieved successfully!',
    data: gadgets.result,
    meta: gadgets.meta,
  });
});

export const GadgetsController = {
  addNewGadget,
  getAllGadgets,
};
