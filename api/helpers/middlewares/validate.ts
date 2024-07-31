import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

import log from "@/utils/logger";

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (e: any) {
      log.error(e);
      return res.status(400).json({ error: e.message });
    }
    next();
  };
