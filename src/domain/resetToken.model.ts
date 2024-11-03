import mongoose, { Document, Schema } from 'mongoose';

interface IResetToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const resetTokenSchema: Schema = new Schema<IResetToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, 
  },
});

const ResetToken = mongoose.model<IResetToken>('ResetToken', resetTokenSchema);
export default ResetToken;
