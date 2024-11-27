"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthController = exports.loginOAuthController = exports.loginController = exports.signupOAuthController = exports.checkUsernameValidityController = exports.signupController = exports.oauth2Client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
const signUp_1 = require("../../use-cases/auth/signUp");
const googleSignUp_1 = require("../../use-cases/auth/googleSignUp");
const googleapis_1 = require("googleapis");
const redirectToGoogleAuth_1 = require("../../use-cases/auth/redirectToGoogleAuth");
const login_1 = require("../../use-cases/auth/login");
const googleLogIn_1 = require("../../use-cases/auth/googleLogIn");
const checkUsernameValidity_1 = require("../../use-cases/auth/checkUsernameValidity");
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET, `${process.env.BaseUrl}/api/v1/auth/google-signup`);
exports.signupController = (0, express_async_handler_1.default)(async (req, res) => {
    console.log("An account is been created..");
    const accountInfo = req.body;
    await (0, signUp_1.signUp)(accountInfo);
    console.log("Account creation sucessfull");
    res.status(201).json({ message: "Account created sucessfully" });
});
exports.checkUsernameValidityController = (0, express_async_handler_1.default)(async (req, res) => {
    (0, checkUsernameValidity_1.checkUsername)(req.params.username);
    res.status(200).end();
});
exports.signupOAuthController = (0, express_async_handler_1.default)(async (req, res) => {
    const { oAuthType } = req.params;
    if (oAuthType === "google")
        (0, redirectToGoogleAuth_1.redirectToGoogleAuth)(res);
    else
        throw new AppError_1.AppError("oAuthTpe parameter must have values like google,facebook", 400);
});
exports.loginController = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ message: "Login sucessful", token: await (0, login_1.logIn)({ email, password }) });
});
exports.loginOAuthController = (0, express_async_handler_1.default)(async (req, res) => {
    const { oAuthType } = req.params;
    if (oAuthType === "google")
        (0, redirectToGoogleAuth_1.redirectToGoogleAuth)(res, "login");
    else
        throw new AppError_1.AppError("oAuthTpe parameter must have values like google,facebook", 400);
});
exports.googleOAuthController = (0, express_async_handler_1.default)(async (req, res) => {
    const { code, state, error } = req.query;
    if (error)
        throw new AppError_1.AppError(error, 400);
    console.log("A User is creating an account with google..");
    console.log(`AuthCode=${code}`);
    if (state === process.env.GoogleOAuthStateValueForSignup) {
        const accountInfo = await (0, googleSignUp_1.googleSignUp)(code);
        //  suppose to redirect to a page to collect the remaining data place the data gotten in the redirected url
        // the json response is for the mean time
        res.status(200).json({ accountInfo });
    }
    else if (state === process.env.GoogleOAuthStateValueForLogin) {
        const jwtForLogIn = await (0, googleLogIn_1.googleLogin)(code);
        // redirect to a page with the jwtToken injected into it we are returning the token in json for now
        res.status(200).json({ jwtForLogIn });
    }
    else {
        throw new AppError_1.AppError("Data has been tempered with", 400);
    }
});
