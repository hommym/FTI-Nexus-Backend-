"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../../domain/errors/AppError");
const bcrypt_1 = require("../../libs/bcrypt");
const objects_1 = require("../../@common/constants/objects");
const signUp = async (accountInfo) => {
    console.log("An Acount is been created..");
    const { email, username, password } = accountInfo;
    if (await objects_1.accountRepo.findByEmail(email))
        throw new AppError_1.AppError(`An account with this email:${email} exist`, 409);
    else if (await objects_1.accountRepo.findByUsername(username))
        throw new AppError_1.AppError(`An account with this username: ${username} exist`, 409);
    if (password) {
        console.log("Encrypting password..");
        accountInfo.password = await (0, bcrypt_1.encryptPassword)(accountInfo.password);
        console.log("Password encrypted");
    }
    await objects_1.accountRepo.create(accountInfo);
};
exports.signUp = signUp;
