"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDb = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const country_list_1 = require("country-list");
// Database structure for Accounts
const userAccountSchema = new mongoose_1.default.Schema({
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
            validator: function (value) {
                return (0, country_list_1.getName)(value) !== undefined;
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
exports.AccountDb = mongoose_1.default.model("Accounts", userAccountSchema);
