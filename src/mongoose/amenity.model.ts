import mongoose from 'mongoose';

export interface IAmenity extends mongoose.Document {
  name: string;
  slug: string;
}

const amenitySchema = new mongoose.Schema<IAmenity>(
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

amenitySchema.pre<IAmenity>('save', function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

export const Amenity = mongoose.model<IAmenity>('amenity', amenitySchema);
