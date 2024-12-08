"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const googleSignUp_1 = require("./googleSignUp");
const login_1 = require("./login");
const googleLogin = async (authCode) => {
    // getting access token
    console.log("Getting access token...");
    const accessToken = await (0, googleSignUp_1.getAccessToken)(authCode);
    // use access token to get user account info
    const { email } = await (0, googleSignUp_1.getUserAccountFromGoogle)(accessToken, "https://www.googleapis.com/oauth2/v3/userinfo");
    return await (0, login_1.logIn)({ email, password: null });
};
exports.googleLogin = googleLogin;
