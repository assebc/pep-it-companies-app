import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken: string | undefined = request.headers.authorization;

  if (!authToken) return response.status(401).end();

  const [, token] = authToken.split(" ");

  try {
    if (process.env.JWT_SECRET) {
      const info = verify(token, process.env.JWT_SECRET);

      if (info.sub) request.id = +info.sub;

      return next();
    }
  } catch (e) {
    console.log(e);
    return response.status(401).end();
  }
}
