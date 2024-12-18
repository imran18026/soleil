import { z } from 'zod';

const addValidationSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  subscriptionOrderId: z.string(),
  registrationFor: z.string().optional(),
  contactDetails: z
    .object({
      name: z.string().optional(),
      phone: z
        .object({
          phoneNumber1: z.string().optional(),
          phoneNumber2: z.string().optional(),
          whatsAppNumber: z.string().optional(),
        })
        .optional(),
      socialMedia: z
        .object({
          isFaceBook: z.boolean().optional(),
          facebookUrl: z.string().optional(),
          isLockedFacebook: z.boolean().optional(),
          isInstagram: z.boolean().optional(),
          instagramUrl: z.string().optional(),
          isLockedInstagram: z.boolean().optional(),
          isTiktok: z.boolean().optional(),
          tiktokUrl: z.string().optional(),
          isLockedTiktok: z.boolean().optional(),
          snapchat: z.boolean().optional(),
          snapchatUrl: z.string().optional(),
          isLockedSnapchat: z.boolean().optional(),
          isLinkedin: z.boolean().optional(),
          linkedinUrl: z.string().optional(),
          isLockedLinkedin: z.boolean().optional(),
        })
        .optional(),
      mobileMoney: z
        .object({
          Wave: z.string().optional(),
          Orange_Money: z.string().optional(),
          Mtn_Money: z.string().optional(),
          Moov_Money: z.string().optional(),
        })
        .optional(),
      locked_area: z
        .object({
          isPageLocked: z.boolean().optional(),
          isNumberLocked: z.boolean().optional(),
          isWhatsappLocked: z.boolean().optional(),
          isSocialMediaLocked: z.boolean().optional(),
        })
        .optional(),
      unLocked_code: z
        .object({
          fullPageCode: z.number().optional(),
          whatsAppCode: z.number().optional(),
          mobileCode: z.number().optional(),
          socialMediaCode: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
  video: z
    .object({
      stickers: z.string().optional(),
      positions: z.string().optional(),
    })
    .optional(),
  voice: z
    .object({
      valueLocation: z.string().optional(), // Placeholder field
    })
    .optional(),
  text: z
    .object({
      value: z.string().optional(),
      colorCode: z.string().optional(),
    })
    .optional(),
});

const addVideosValidationSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  subscriptionOrderId: z.string(),
  registrationFor: z.string().optional(),
  video: z
    .object({
      stickers: z.string().optional(),
      positions: z.string().optional(),
    })
    .optional(),
});

const addVoiceValidationSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  subscriptionOrderId: z.string(),
  registrationFor: z.string().optional(),
  voice: z.object({
    valueLocation: z.string(),
  }),
});

const addTextValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
    subscriptionOrderId: z.string(),
    registrationFor: z.string().optional(),
    text: z.object({
      value: z.string(),
      colorCode: z.string(),
    }),
  }),
});

export const gadgetsValidations = {
  addValidationSchema,
  addVideosValidationSchema,
  addVoiceValidationSchema,
  addTextValidationSchema,
};
