"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestParamsValidator = requestParamsValidator;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
function requestParamsValidator(args) {
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        args.forEach((params) => {
            const { paramsName, requiredDataType } = params;
            if (requiredDataType === "number") {
                try {
                    +req.params[paramsName];
                }
                catch (error) {
                    throw new AppError_1.AppError(`Data type for ${paramsName} url parameter must be an integer`, 400);
                }
            }
        });
        next();
    });
}
