"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignUp = exports.getUserAccountFromGoogle = exports.getAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("../../domain/errors/AppError");
const authControllers_1 = require("../../interface/auth/authControllers");
const getAccessToken = async (authCode) => {
    try {
        const { tokens } = await authControllers_1.oauth2Client.getToken(authCode);
        console.log("Access token recieved");
        return tokens.access_token;
    }
    catch (error) {
        throw new AppError_1.AppError("Something went wrong try again in a few minutes", 400);
    }
};
exports.getAccessToken = getAccessToken;
const getUserAccountFromGoogle = async (accessToken, url = null) => {
    console.log("Getting user accountInfo");
    const accountInfo = await (0, axios_1.default)({
        method: "get",
        url: url ? url : "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(`Request status=${accountInfo.status}`);
    return accountInfo.data;
};
exports.getUserAccountFromGoogle = getUserAccountFromGoogle;
const googleSignUp = async (authCode) => {
    // getting access token
    console.log("Getting access token...");
    const accessToken = await (0, exports.getAccessToken)(authCode);
    // use access token to get user account info
    const { names, emailAddresses, photos, phoneNumbers, birthdays, genders } = await (0, exports.getUserAccountFromGoogle)(accessToken);
    const dateOfBirth = birthdays
        ? `${birthdays[0].date.year}-${birthdays[0].date.month.length === 1 ? `0${birthdays[0].date.month}` : birthdays[0].date.month}-${birthdays[0].date.day.length === 1 ? `0${birthdays[0].date.day}` : birthdays[0].date.day}`
        : null;
    return {
        firstName: names ? names[0].givenName : null,
        lastName: names ? names[0].familyName : null,
        email: emailAddresses ? emailAddresses[0].value : null,
        profile: photos ? photos[0].url : null,
        phone: phoneNumbers ? phoneNumbers[0].value : null,
        gender: genders ? genders[0].value : null,
        dateOfBirth,
    };
};
exports.googleSignUp = googleSignUp;
