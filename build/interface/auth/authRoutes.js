"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("./authControllers");
const bodyValidator_1 = require("../middlewares/bodyValidator");
const createAccountDto_1 = require("./dtos/createAccountDto");
const loginDto_1 = require("./dtos/loginDto");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/signup", (0, bodyValidator_1.requestBodyValidator)(createAccountDto_1.CreateAccountDto), authControllers_1.signupController);
exports.authRouter.post("/login", (0, bodyValidator_1.requestBodyValidator)(loginDto_1.LoginDto), authControllers_1.loginController);
// url for redirecting to third party auth page during signup
exports.authRouter.get("/signup/:oAuthType", authControllers_1.signupOAuthController);
// url for redirecting to third party auth page during login
exports.authRouter.get("/login/:oAuthType", authControllers_1.loginOAuthController);
// callback url for google after recieving consent from the user.
exports.authRouter.get("/google-signup", authControllers_1.googleOAuthController);
