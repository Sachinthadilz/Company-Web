import { Request, Response, NextFunction } from "express";
import {
  getSessionCookieName,
  parseCookies,
  verifyAdminSessionToken,
} from "../config/adminAuth";
import { ERROR_MESSAGES } from "../constants/adminAuth";

const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies[getSessionCookieName()];

  if (!token) {
    res
      .status(401)
      .json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
    return;
  }

  const session = verifyAdminSessionToken(token);
  if (!session) {
    res
      .status(401)
      .json({ success: false, message: ERROR_MESSAGES.UNAUTHORIZED });
    return;
  }

  res.locals.admin = { email: session.email };
  next();
};

export default requireAdmin;
