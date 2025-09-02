import { Request, Response, NextFunction } from "express";

export const useCache =
  (hashKey: string) => (req: Request, res: Response, next: NextFunction) => {
    (req as any).cacheHashKey = hashKey;
    next();
  };