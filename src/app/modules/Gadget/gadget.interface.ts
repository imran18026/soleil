import { Model, Types } from 'mongoose';

type TText = {
  value: string;
  colorCode: string;
};

type TVideo = {
  valueLocation: string;
  stickers?: string;
  positions?: string;
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
  isLockedFacebook?: boolean;
  isInstagram?: boolean;
  instagramUrl?: string;
  isLockedInstagram?: boolean;
  isTiktok?: boolean;
  tiktokUrl?: string;
  isLockedTiktok?: boolean;
  snapchat?: boolean;
  snapchatUrl?: string;
  isLockedSnapchat?: boolean;
  isLinkedin?: boolean;
  linkedinUrl?: string;
  isLockedLinkedin?: boolean;
};
type TLockedArea = {
  isPageLocked?: boolean;
  isNumberLocked?: boolean;
  isWhatsappLocked?: boolean;
  isSocialMediaLocked?: boolean;
};

type TUnlockedCode = {
  fullPageCode?: string;
  whatsAppCode?: string;
  mobileCode?: string;
  socialMediaCode?: string;
};
type TPhotos = {
  photo1?: string;
  photo2?: string;
};

type TPhoneNumber = {
  phoneNumber1?: string;
  phoneNumber2?: string;
  whatsAppNumber?: string;
};

type TCommonContactDetails = {
  name?: string;
  photos?: TPhotos;
  phone?: TPhoneNumber;
  socialMedia?: TSocialMedia;
  mobileMoney?: TMobileMoney;
  locked_area?: TLockedArea;
  unLocked_code?: TUnlockedCode;
};

export type TGadgets = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  subscriptionOrderId?: Types.ObjectId | null;
  registrationFor?: 'myself' | 'myBusiness';
  contactDetails?: TCommonContactDetails;
  text?: TText;
  video?: TVideo;
  voice?: TVoice;
};

export type GadgetsModel = Model<TGadgets>;
