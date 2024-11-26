import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";

interface QueryValidatorArgs {
  queryName: string;
  requiredDataType: string;
}

export function requestQueryValidator(args: QueryValidatorArgs[]) {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    args.forEach((query) => {
      const { queryName, requiredDataType } = query;
      if (!req.query[queryName]) throw new AppError(`No data passed for ${queryName} query in request`, 400);
      else if (requiredDataType === "number") {
        try {
          +req.query[queryName];
        } catch (error) {
          throw new AppError(`Data type for ${queryName} query must be an integer`, 400);
        }
      }
    });

    next();
  });
}
