import { unlink } from 'fs/promises';
import httpStatus from 'http-status';

import QueryBuilder from '../../builder/QueryBuilder';
import { TGadgets } from './gadget.interface';
import { Gadgets } from './gadget.model';

const addNewGadget = async (
  files: Express.Multer.File[],
  data: Partial<TGadgets>,
): Promise<TGadgets> => {
  // console.log(data);
  // Save file path or handle photo/video as needed

  const fileUrls = files.map((file) => file.path.replace('public\\', ''));
  if (fileUrls.length > 1) {
    data.contactDetails = data.contactDetails ?? {};
    data.contactDetails.photos = data.contactDetails.photos ?? {};
    data.contactDetails.photos.photo1 = fileUrls[0];
    data.contactDetails.photos.photo2 = fileUrls[1];
  }
  if (fileUrls.length === 1) {
    data.video = data.video ?? { valueLocation: fileUrls[0] };
    data.voice = data.voice ?? { valueLocation: fileUrls[0] };
  }
  data.text = {
    value: data.text?.value ?? '',
    colorCode: data.text?.colorCode ?? '',
  };
  data.contactDetails = { ...data.contactDetails };
  data.contactDetails.photos = data.contactDetails?.photos || {};
  data.video = {
    ...data.video,
    valueLocation: data.video?.valueLocation ?? fileUrls[0],
  };
  data.voice = {
    ...data.voice,
    valueLocation: data.voice?.valueLocation ?? fileUrls[0],
  };

  const result = await Gadgets.create({
    ...data,
    contactDetails: {
      ...(data.contactDetails || {}),
    },
    text: {
      ...(data.text || {}),
    },
    video: {
      ...(data.video || {}),
    },
    voice: {
      ...(data.voice || {}),
    },
  });

  return result;
};

/**
 * Get all gadgets with query filters and pagination.
 */
const getAllGadgets = async (query: Record<string, unknown>) => {
  const gadgetsQuery = new QueryBuilder(Gadgets.find(), query)
    .search([]) // Adjust searchable fields as per your needs
    .filter([]) // Adjust filterable fields as per your needs
    .sort()
    .paginate()
    .fields();

  const meta = await gadgetsQuery.countTotal();
  const result = await gadgetsQuery.modelQuery;

  return { meta, result };
};

export const GadgetsService = {
  addNewGadget,
  getAllGadgets,
};
