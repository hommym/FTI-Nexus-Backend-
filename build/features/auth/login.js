"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const objects_1 = require("../../@common/constants/objects");
const AppError_1 = require("../../domain/errors/AppError");
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
const logIn = async (logInCredentials) => {
    const { email, password } = logInCredentials;
    const account = await objects_1.accountRepo.findByEmail(email);
    if (!account)
        throw new AppError_1.AppError("No account with this email exist", 404);
    if (password) {
        await (0, bcrypt_1.verifyPassword)(password, account.password);
    }
    return (0, jwt_1.jwtForLogIn)(String(account._id));
};
exports.logIn = logIn;
