// File: order.controller.ts
// Description: Controller logic for the Order module

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createQrManageService } from './qrManage.service';

const createQrManage = catchAsync(async (req: Request, res: Response) => {
  const qrManageData = req.body;
  const result = await createQrManageService.createQrManage(qrManageData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Qr Manage created successfully!',
    data: result,
  });
});

const getAllQrManage = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  const result = await createQrManageService.getAllQrManage(id);
  res.status(200).send(result);
});

export const QrManageController = {
  createQrManage,
  getAllQrManage,
};
