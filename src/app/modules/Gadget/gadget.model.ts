import { Schema, model } from 'mongoose';
import { GadgetsModel, TGadgets } from './gadget.interface';

// Define sub-schemas for contactDetails
const TextSchema = new Schema({
  value: { type: String, required: false },
  colorCode: { type: String, required: false },
});

const VideoSchema = new Schema({
  valueLocation: { type: String, required: false },
  stickers: { type: String },
  positions: { type: String },
});

const VoiceSchema = new Schema({
  valueLocation: { type: String, required: false },
});

const MobileMoneySchema = new Schema({
  Wave: { type: String },
  Orange_Money: { type: String },
  Mtn_Money: { type: String },
  Moov_Money: { type: String },
});

const SocialMediaSchema = new Schema({
  isFaceBook: { type: Boolean },
  facebookUrl: { type: String },
  isLockedFacebook: { type: Boolean },
  isInstagram: { type: Boolean },
  instagramUrl: { type: String },
  isLockedInstagram: { type: Boolean },
  isTiktok: { type: Boolean },
  tiktokUrl: { type: String },
  isLockedTiktok: { type: Boolean },
  snapchat: { type: Boolean },
  snapchatUrl: { type: String },
  isLockedSnapchat: { type: Boolean },
  isLinkedin: { type: Boolean },
  linkedinUrl: { type: String },
  isLockedLinkedin: { type: Boolean },
});

const LockedAreaSchema = new Schema({
  isPageLocked: { type: Boolean },
  isNumberLocked: { type: Boolean },
  isWhatsappLocked: { type: Boolean },
  isSocialMediaLocked: { type: Boolean },
});

const PhotosSchema = new Schema({
  photo1: { type: String },
  photo2: { type: String },
});

const PhoneNumberSchema = new Schema({
  phoneNumber1: { type: String },
  phoneNumber2: { type: String },
  whatsAppNumber: { type: String },
});

const UnlockedCodeSchema = new Schema({
  fullPageCode: { type: String },
  whatsAppCode: { type: String },
  mobileCode: { type: String },
  socialMediaCode: { type: String },
});

const CommonContactDetailsSchema = new Schema({
  name: { type: String },
  photos: { type: PhotosSchema },
  phone: { type: PhoneNumberSchema },
  socialMedia: { type: SocialMediaSchema },
  mobileMoney: { type: MobileMoneySchema },
  locked_area: { type: LockedAreaSchema },
  unLocked_code: { type: UnlockedCodeSchema },
});

// Main Gadgets Schema
const gadgetsSchema = new Schema<TGadgets, GadgetsModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    subscriptionOrderId: {
      type: Schema.Types.ObjectId,
      ref: 'SubscriptionOrder',
      required: true,
    },
    registrationFor: {
      type: String,
      enum: ['myself', 'myBusiness'],
      required: true,
    },
    contactDetails: { type: CommonContactDetailsSchema, required: false },
    text: { type: TextSchema, required: false },
    video: { type: VideoSchema, required: false },
    voice: { type: VoiceSchema, required: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const Gadgets = model<TGadgets, GadgetsModel>('Gadgets', gadgetsSchema);
