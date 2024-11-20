import { Types } from "mongoose";

export interface Account {
  _id:Types.ObjectId;
  accountType: "trader" | "investor";
  fullName: string;
  email: string;
  phone: string;
  password: string;
  username: string;
  dateOfBirth: string;
  countryOfOrigin: string;
  isAccountVerified: boolean;
  profile: string;
}




