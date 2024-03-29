import mongoose from 'mongoose';

export interface IToken extends mongoose.Document {
  code: string | null;
  token: string | null;
  type: 'email-verification' | 'password-reset' | 'refresh-token';
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
}

const tokenSchema: mongoose.Schema<IToken> = new mongoose.Schema<IToken>(
  {
    code: {
      type: String,
      required: false,
      default: null,
    },

    token: {
      type: String,
      required: false,
      default: null,
    },

    type: {
      type: String,
      required: true,
      enum: ['email-verification', 'password-reset', 'refresh-token'],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    expiresAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: '1h',
    },
  },
  {
    timestamps: false,
  }
);

export const Token = mongoose.model<IToken>('token', tokenSchema);
