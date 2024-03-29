import mongoose from 'mongoose';

export interface IPhoto extends mongoose.Document {
  propertyId: mongoose.Types.ObjectId;
  url: string;
  order: number;
}

const photoSchema = new mongoose.Schema<IPhoto>(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Photo = mongoose.model<IPhoto>('photo', photoSchema);
