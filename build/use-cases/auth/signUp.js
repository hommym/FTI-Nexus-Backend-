"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const signUp = (accountInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An Acount is been created..");
    const { email, username, password } = accountInfo;
    if (yield objects_1.accountRepo.findByEmail(email))
        throw new AppError_1.AppError(`An account with this email:${email} exist`, 409);
    else if (yield objects_1.accountRepo.findByUsername(username))
        throw new AppError_1.AppError(`An account with this username: ${username} exist`, 409);
    if (password) {
        console.log("Encrypting password..");
        accountInfo.password = yield (0, bcrypt_1.encryptPassword)(accountInfo.password);
        console.log("Password encrypted");
    }
    yield objects_1.accountRepo.create(accountInfo);
});
exports.signUp = signUp;
