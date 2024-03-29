import mongoose from 'mongoose';

export interface IBedType extends mongoose.Document {
  name: string;
  slug: string;
}

const bedTypeSchema = new mongoose.Schema<IBedType>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

bedTypeSchema.pre<IBedType>('save', function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

export const BedType = mongoose.model<IBedType>('bed-type', bedTypeSchema);
