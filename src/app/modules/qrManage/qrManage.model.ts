import { Schema, model } from 'mongoose';
import { QrManageModel, TQrManage } from './qrManage.interface';

const MobileMoneySchema = new Schema({
  Wave: { type: String },
  Orange_Money: { type: String },
  Mtn_Money: { type: String },
  Moov_Money: { type: String },
});

const SocialMediaSchema = new Schema({
  isFaceBook: { type: Boolean },
  facebookUrl: { type: String },
  isInstagram: { type: Boolean },
  instagramUrl: { type: String },
  isTiktok: { type: Boolean },
  tiktokUrl: { type: String },
  snapchart: { type: Boolean },
  snapchartUrl: { type: String },
  isLinkedin: { type: Boolean },
  linkedinUrl: { type: String },
});

const CommonDtailsSchema = new Schema({
  mobileMoney: MobileMoneySchema,
  socialMedia: SocialMediaSchema,
});

const PhotosSchema = new Schema({
  photo1: { type: String },
  photo2: { type: String },
});

const PhoneNumberSchema = new Schema({
  phoneNumber1: { type: String },
  phoneNumber2: { type: String },
  whatsappNumber: { type: String },
});

const ContactDetailsSchema = new Schema({
  name: { type: String, required: true },
  photos: PhotosSchema,
  numbers: PhoneNumberSchema,
});

const LockedSchema = new Schema({
  isLockpage: { type: Boolean, required: true },
  isNumberLocked: { type: Boolean, required: true },
  isWhatsappLocked: { type: Boolean, required: true },
  isScoilMediaLocked: { type: Boolean, required: true },
});

const TextSchema = new Schema({
  value: { type: String },
  colorCode: { type: String },
});

const VideoSchema = new Schema({
  valueLocation: { type: String },
});

const VoiceSchema = new Schema({
  valueLocation: { type: String },
});

const qrManageSchema = new Schema<TQrManage, QrManageModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    registretionFor: {
      type: String,
      enum: ['myself', 'mybusiness'],
      required: true,
    },
    commonDtails: CommonDtailsSchema,
    fourDegitCode: {
      type: Number,
    },
    locked: LockedSchema,
    contactDetails: ContactDetailsSchema,
    text: TextSchema,
    video: VideoSchema,
    voice: VoiceSchema,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const QrManage = model<TQrManage, QrManageModel>(
  'QrManage',
  qrManageSchema,
);
