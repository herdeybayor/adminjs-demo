import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  propertyId: mongoose.Types.ObjectId;
  stripePaymentIntentId?: string;
  stripeCheckoutSessionId: string;
  status: string;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    stripePaymentIntentId: {
      type: String,
      required: false,
    },
    stripeCheckoutSessionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['awaiting-payment', 'paid', 'cancelled'],
      default: 'awaiting-payment',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>('booking', bookingSchema);
