import { Model, Types } from 'mongoose';
import { number } from 'zod';

type TText = {
  value: string;
  colorCode: string;
};
type TVideo = {
  valueLocation: string;
};
type TVoice = {
  valueLocation: string;
};
type TMobileMoney = {
  Wave?: string;
  Orange_Money?: string;
  Mtn_Money?: string;
  Moov_Money?: string;
};

type TSocialMedia = {
  isFaceBook?: boolean;
  facebookUrl?: string;
  isInstagram?: boolean;
  instagramUrl?: string;
  isTiktok?: boolean;
  tiktokUrl?: string;
  snapchart?: boolean;
  snapchartUrl?: string;
  isLinkedin?: boolean;
  linkedinUrl?: string;
};
type TPhotos = {
  photo1?: string;
  photo2?: string;
};
type TCommonDtails = {
  mobileMoney?: TMobileMoney;
  socialMedia?: TSocialMedia;
};
type TphoneNumber = {
  phoneNumber1?: string;
  phoneNumber2?: string;
  whatsappNumber?: string;
};
type TContactDetails = {
  name: string;
  photos?: TPhotos;
  numbers?: TphoneNumber;
};
type TLocked = {
  isLockpage: boolean;
  isNumberLocked: boolean;
  isWhatsappLocked: boolean;
  isScoilMediaLocked: boolean;
};
export type TQrManage = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  registretionFor: 'myself' | 'mybusiness';
  commonDtails?: TCommonDtails;
  fourDegitCode?: number;
  locked: TLocked;
  contactDetails?: TContactDetails;
  text?: TText;
  video?: TVideo;
  voice?: TVoice;
};

export type QrManageModel = Model<TQrManage>;
