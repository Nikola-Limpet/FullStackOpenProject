import { NextFunction } from "express";
import { newEntrySchema } from "../utils/toNewDiaryEntry";
import { Request, Response } from "express";

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
