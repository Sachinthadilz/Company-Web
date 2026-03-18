import crypto from "crypto";
import bcrypt from "bcryptjs";

const SESSION_COOKIE_NAME = "artecx_admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8; // 8 hours

interface AdminSessionPayload {
  email: string;
  exp: number;
}

const encodeBase64Url = (value: string) =>
  Buffer.from(value, "utf8").toString("base64url");

const decodeBase64Url = (value: string) =>
  Buffer.from(value, "base64url").toString("utf8");

const signValue = (value: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(value).digest("base64url");

export const getSessionCookieName = () => SESSION_COOKIE_NAME;

export const getAdminEmail = () =>
  process.env.ADMIN_EMAIL?.trim().toLowerCase() || "";

export const getSessionSecret = () =>
  process.env.ADMIN_SESSION_SECRET?.trim() || "";

// Hash password - use this helper to generate ADMIN_PASSWORD_HASH
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

// Verify password against stored bcrypt hash
export const verifyAdminPassword = async (
  password: string,
): Promise<boolean> => {
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!passwordHash) {
    return false;
  }

  try {
    return await bcrypt.compare(password, passwordHash);
  } catch {
    return false;
  }
};

export const createAdminSessionToken = (email: string) => {
  const secret = getSessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured");
  }

  const payload: AdminSessionPayload = {
    email,
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
};

export const verifyAdminSessionToken = (token: string) => {
  const secret = getSessionSecret();
  if (!secret) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload, secret);
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      decodeBase64Url(encodedPayload),
    ) as AdminSessionPayload;
    if (!payload.email || typeof payload.exp !== "number") {
      return null;
    }

    if (payload.exp < Date.now()) {
      return null;
    }

    if (payload.email !== getAdminEmail()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
};

export const parseCookies = (cookieHeader?: string) => {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(";")
    .reduce<Record<string, string>>((cookies, part) => {
      const [name, ...valueParts] = part.trim().split("=");
      if (!name) {
        return cookies;
      }

      cookies[name] = decodeURIComponent(valueParts.join("="));
      return cookies;
    }, {});
};

export const getAdminAuthConfigError = () => {
  const email = getAdminEmail();
  const secret = getSessionSecret();
  const hasPasswordHash = Boolean(process.env.ADMIN_PASSWORD_HASH?.trim());

  if (!email) {
    return "ADMIN_EMAIL is not configured";
  }

  if (!secret) {
    return "ADMIN_SESSION_SECRET is not configured";
  }

  if (!hasPasswordHash) {
    return "ADMIN_PASSWORD_HASH is not configured";
  }

  return null;
};
