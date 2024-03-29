import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  image: string | null;
  emailVerified: boolean;
  accountDisabled: boolean;
  role: 'user' | 'admin';
  lastActive: Date;
  favoriteIds: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    accountDisabled: {
      type: Boolean,
      required: true,
      default: false,
    },

    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },

    lastActive: {
      type: Date,
      required: true,
      default: Date.now,
    },

    favoriteIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('user', userSchema);
