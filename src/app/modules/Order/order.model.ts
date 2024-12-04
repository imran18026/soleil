// File: order.model.ts
// Updated schema for Order module

import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder, OrderModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productIds: {
      type: [String],
      required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment', // Reference to the Payment collection
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['New order', 'In the procss', 'Odrer delivered'],
      default: 'New order',
    },
    isAbidjan: {
      type: Boolean,
      default: false,
    },
    deliveryLocation: {
      type: String,
    },
    isSaveLocation: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    ispaymentDone: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

orderSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Order = model<TOrder, OrderModel>('Order', orderSchema);
