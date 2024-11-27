import { Types } from "mongoose";

export interface Otp {
  _id: Types.ObjectId;
  email:string;
  code:string;  // jwt containing the 4 digit code
}
