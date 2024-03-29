import mongoose from 'mongoose';

// import BedTypeModel from "./bed-type.model";
// import PhotoModel from "./photo.model";
// import AmenityModel from "./amenity.model";

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  CONDOMINIUM = 'CONDOMINIUM',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  BEDANDBREAKFAST = 'BEDANDBREAKFAST',
  GUESTHOUSE = 'GUESTHOUSE',
  BOUTIQUEHOTEL = 'BOUTIQUEHOTEL',
  HOTEL = 'HOTEL',
  RESORT = 'RESORT',
}

export type IAddress = {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
};

export interface IProperty extends mongoose.Document {
  creatorId: mongoose.Types.ObjectId;
  name: string;
  nickname: string;
  currency: string;
  checkInTime: number;
  checkOutTime: number;
  type: PropertyType;
  maximumCapacity: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  isFeatured: boolean;
  isAvailable: boolean;
  bedTypes: mongoose.Types.ObjectId[];
  description: string;
  address: IAddress;
  photos: mongoose.Types.ObjectId[];
  amenities: mongoose.Types.ObjectId[];
  price: number;
  propertySlug: string;
  upListingPropertyId?: string;
  cleaningFee: number;
}

const propertySchema = new mongoose.Schema<IProperty>(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    checkInTime: {
      type: Number,
      required: true,
    },
    checkOutTime: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(PropertyType),
      required: true,
    },
    maximumCapacity: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bed-type',
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photo',
      },
    ],
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'amenity',
      },
    ],
    description: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      suite: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    propertySlug: {
      type: String,
      unique: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    upListingPropertyId: {
      type: String,
    },
    cleaningFee: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.pre<IProperty>('save', function (next) {
  this.propertySlug = this.name.toLowerCase().replace(/ /g, '-');
  next();
});

propertySchema.pre<IProperty>(/^save|^find|^findOne/, function (next) {
  this.populate({ path: 'bedTypes', select: 'name slug' });
  this.populate({ path: 'photos', select: 'url order' });
  this.populate({ path: 'amenities', select: 'name slug' });
  next();
});

export const Property = mongoose.model<IProperty>('property', propertySchema);
