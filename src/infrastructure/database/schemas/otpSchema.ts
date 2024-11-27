import mongoose from "mongoose";
import { Otp } from "../../../domain/auth/otp";

const otpSchema = new mongoose.Schema<Otp>({
  email: {
    type: String,
    required: true,
  },

  code: {
    type: String,
    required: true,
  },
});


export const OtpDb = mongoose.model("Otps", otpSchema)