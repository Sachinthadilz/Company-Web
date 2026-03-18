export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 1000 * 60 * 60 * 8, // 8 hours
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  INVALID_CREDENTIALS: "Invalid admin credentials",
  CONFIG_ERROR: "Admin authentication is not properly configured",
  LOGOUT_SUCCESS: "Logged out successfully",
} as const;
