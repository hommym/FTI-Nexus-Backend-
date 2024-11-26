import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";

interface ParamsValidatorArgs {
  paramsName: string;
  requiredDataType: string;
}

export function requestParamsValidator(args: ParamsValidatorArgs[]) {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    args.forEach((params) => {
      const { paramsName, requiredDataType } = params;
       if (requiredDataType === "number") {
        try {
          +req.params[paramsName];
        } catch (error) {
          throw new AppError(`Data type for ${paramsName} url parameter must be an integer`, 400);
        }
      }
    });

    next();
  });
}
