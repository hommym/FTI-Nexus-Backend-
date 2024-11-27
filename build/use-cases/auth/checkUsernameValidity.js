"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsername = void 0;
const objects_1 = require("../../@common/constants/objects");
const AppError_1 = require("../../domain/errors/AppError");
const checkUsername = async (username) => {
    if (await objects_1.accountRepo.findByUsername(username))
        throw new AppError_1.AppError(`Username not avaialable`, 409);
};
exports.checkUsername = checkUsername;
