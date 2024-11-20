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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const objects_1 = require("../../@common/constants/objects");
const AppError_1 = require("../../domain/errors/AppError");
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
const logIn = (logInCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = logInCredentials;
    const account = yield objects_1.accountRepo.findByEmail(email);
    if (!account)
        throw new AppError_1.AppError("No account with this email exist", 404);
    if (password) {
        yield (0, bcrypt_1.verifyPassword)(password, account.password);
    }
    return (0, jwt_1.jwtForLogIn)(String(account._id));
});
exports.logIn = logIn;
