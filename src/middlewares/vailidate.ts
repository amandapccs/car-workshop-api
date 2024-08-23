import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { statusCode } from "../shared/status-code/status-code";

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }
      return res.status(statusCode.CONFLICT).json({
        statusCode: statusCode.CONFLICT,
        error: err,
      });
    }
  };
