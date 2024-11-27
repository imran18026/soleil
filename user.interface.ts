import { Model, Types } from 'mongoose';

import { USER_ROLE } from './user.constants';

export type TUser = {
  _id: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  status: 'active' | 'blocked';
  isDeleted: boolean;
};

export interface DeleteAccountPayload {
  password: string;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
  isUserActive(email: string): Promise<TUser>;
  IsUserExistById(id: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type IPaginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
