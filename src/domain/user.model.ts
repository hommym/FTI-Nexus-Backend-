import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
