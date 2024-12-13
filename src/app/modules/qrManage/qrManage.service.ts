import mongoose from 'mongoose';
import { Product } from '../Product/product.model';

import { User } from '../user/user.models';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { ProductInfo } from '../ProductInfo/ProductInfo.model';
import { TQrManage } from './qrManage.interface';
import { QrManage } from './qrManage.model';

const createQrManage = async (
  data: Partial<TQrManage>,
): Promise<TQrManage | any> => {
  // const user = await User.findById(data.userId);
  // if (!user) {
  //   throw new Error('User not found');
  // }

  const newQrManage = await QrManage.create(data);
};

const getAllQrManage = async (productId: string) => {


  
  const qrManageQuery = await QrManage.findOne({ user: productId });

  const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>QR Manage Details</title>
      </head>
      <body>
        <h1>QR Manage Details</h1>
        <p><strong>Product ID:</strong> ${productId}</p>
        </body>
      </html>
    `;

  return htmlResponse;
};

export const createQrManageService = {
  createQrManage,
  getAllQrManage,
};
