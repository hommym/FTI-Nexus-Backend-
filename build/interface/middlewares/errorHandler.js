"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../../domain/errors/AppError");
const mongoose_1 = require("mongoose");
const errorHandler = async (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        const errorCollection = err.message.split(":");
        res.status(400).json({ error: errorCollection[2].split(",")[0] });
    }
    else if (err instanceof SyntaxError) {
        res.status(400).json({ error: err.message });
    }
    else {
        console.log(err.message);
        res.status(500).json({ error: "Server Error" });
    }
};
exports.errorHandler = errorHandler;
