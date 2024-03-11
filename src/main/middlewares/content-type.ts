import { type Request, type Response, type NextFunction } from "express";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const content_type = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.type("json");
  next();
};
