import { NextFunction } from "express";

import { Request, Response } from "express";
import { newPatientSchema } from "../utils/toNewPatientEntry";

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
