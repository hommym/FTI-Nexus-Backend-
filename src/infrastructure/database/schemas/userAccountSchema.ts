import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import { Account } from "../../../domain/auth/userAccount";
import {getName} from "country-list"

// Database structure for Accounts
const userAccountSchema = new mongoose.Schema<Account>({
  accountType: {
    type: String,
    enum: { values: ["trader", "investor"], message: `{VALUE} is not a valid value for accountType.Valid values= trader investor` },
    required: [true, "No data passed for accountType"],
  },
  fullName: {
    type: String,
    required: [true, "No data passed for fUllName"],
  },
  email: {
    type: String,
    required: [true, "No data passed for email"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email value is invalid. email must be in the form username@domain.com and must not contain any space"],
  },
  phone: {
    type: String,
    required: [true, "No data passed for phone"],
    match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "phone value is invalid."],
  },
  password: {
    type: String,
    required: [true, "No data passed for password"],
  },
  username: {
    type: String,
    required: [true, "No data passed for username"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "No data passed for dateOfBirth"],
    match: [/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "dateOfBirth value invalid. dateOfBirth must be in this form yyyy-mm-dd"],
  },
  countryOfOrigin: {
    type: String,
    required: [true, "No data passed for countryOfOrigin"],
    match: [/^[A-Za-z]+$/, "countryOfOrigin value invalid. countryOfOrigin must be a string and must not contain any space"],
    validate: {
      validator: function (value: string) {
        return getName(value) !== undefined;
      },
      message: "Value passed of countryOfOrigin is not a country's ISO code",
    },
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: String,
    default: `${process.env.BaseUrl}/defaultProfile.png`,
  },
});

export const AccountDb = mongoose.model("Accounts", userAccountSchema);
