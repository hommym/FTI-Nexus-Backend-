"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../domain/errors/AppError");
const encryptPassword = async (rawPassword) => {
    return await bcrypt_1.default.hash(rawPassword, Number(process.env.PasswordEncrptRounds));
};
exports.encryptPassword = encryptPassword;
const verifyPassword = async (rawPassword, encryptedPassword) => {
    const isPasswordCorrect = await bcrypt_1.default.compare(rawPassword, encryptedPassword);
    if (!isPasswordCorrect)
        throw new AppError_1.AppError("Invalid email and password", 401);
};
exports.verifyPassword = verifyPassword;
