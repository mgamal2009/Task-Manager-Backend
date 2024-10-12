import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Response, NextFunction } from "express";
import {Request} from '../types/request'


// A generic validation middleware to validate any DTO
export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Transform request body to DTO class instance
    const dto = plainToClass(dtoClass, req.body);
    // Validate the DTO instance
    const errors = await validate(dto);

    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => err.constraints),
      });
      return;
    }
    // If validation is successful, proceed to the next middleware/controller
    req.body = dto;
    next();
  };
}
