"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestQueryValidator = requestQueryValidator;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
function requestQueryValidator(args) {
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        args.forEach((query) => {
            const { queryName, requiredDataType } = query;
            if (!req.query[queryName])
                throw new AppError_1.AppError(`No data passed for ${queryName} query in request`, 400);
            else if (requiredDataType === "number") {
                try {
                    +req.query[queryName];
                }
                catch (error) {
                    throw new AppError_1.AppError(`Data type for ${queryName} query must be an integer`, 400);
                }
            }
        });
        next();
    });
}
