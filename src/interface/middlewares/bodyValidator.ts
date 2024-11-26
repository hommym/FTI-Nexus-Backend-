import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/errors/AppError";

export function requestBodyValidator(type: any): any {
  return asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      console.log(errors)
     throw new AppError("Invalid Request Body",400)
    }
    next();
  })
}
