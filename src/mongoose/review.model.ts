import mongoose from 'mongoose';

// Table Review {
//   _id, objectID, -, pk;
//   propertyId, objectID, ref<Property._id>, fk;
//   userId, objectID, ref<User._id>, fk;
//   rating, Integer, -, -;
//   comment, string, -, -;
//   createdAt, Timestamp, -, -;
//   updateAt, Timestamp, -, -;
// }

export interface IReview extends mongoose.Document {
  propertyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.model<IReview>('review', reviewSchema);
