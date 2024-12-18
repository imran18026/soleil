// File: order.model.ts
// Description: Mongoose schema and model for Order module

import { Schema, model } from 'mongoose';
import { OrderModel, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder, OrderModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
      default: null,
    },
    productsCost: {
      type: Number,
      required: true,
      default: 0,
    },
    orderPaymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    productInfoId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductInfo',
      required: true,
    },
    deliveryCost: {
      type: Number,
      required: true,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['pending', 'New order', 'In the process', 'Order delivered'],
      default: 'pending',
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
    isPaymentDone: {
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
