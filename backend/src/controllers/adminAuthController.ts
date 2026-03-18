import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  createAdminSessionToken,
  getAdminAuthConfigError,
  getAdminEmail,
  getSessionCookieName,
  parseCookies,
  verifyAdminPassword,
  verifyAdminSessionToken,
} from "../config/adminAuth";
import { SESSION_COOKIE_OPTIONS, ERROR_MESSAGES } from "../constants/adminAuth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const configError = getAdminAuthConfigError();
    if (configError) {
      res
        .status(500)
        .json({ success: false, message: ERROR_MESSAGES.CONFIG_ERROR });
      return;
    }

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, errors: parsed.error.issues });
      return;
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const isValidPassword = await verifyAdminPassword(password);
    if (normalizedEmail !== getAdminEmail() || !isValidPassword) {
      res
        .status(401)
        .json({ success: false, message: ERROR_MESSAGES.INVALID_CREDENTIALS });
      return;
    }

    const token = createAdminSessionToken(normalizedEmail);
    res.cookie(getSessionCookieName(), token, SESSION_COOKIE_OPTIONS);
    res.status(200).json({
      success: true,
      data: {
        email: normalizedEmail,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAdmin = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.clearCookie(getSessionCookieName(), SESSION_COOKIE_OPTIONS);
    res
      .status(200)
      .json({ success: true, message: ERROR_MESSAGES.LOGOUT_SUCCESS });
  } catch (error) {
    next(error);
  }
};

export const getAdminSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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

    res.status(200).json({
      success: true,
      data: {
        email: session.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
