"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBodyValidator = requestBodyValidator;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
function requestBodyValidator(type) {
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(type, req.body);
        const errors = await (0, class_validator_1.validate)(dtoInstance);
        if (errors.length > 0) {
            console.log(errors);
            throw new AppError_1.AppError("Invalid Request Body", 400);
        }
        next();
    });
}
