import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { type Request, type Response, type NextFunction } from "express";

// Validate that secrets are present in production
if (process.env.NODE_ENV === "production") {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_SECRET and JWT_REFRESH_SECRET must be set in production");
  }
}

// Use fallback only in development for convenience
const JWT_SECRET = process.env.JWT_SECRET || (
  process.env.NODE_ENV === "development" 
    ? "dev-only-jwt-secret-change-in-production" 
    : (() => { throw new Error("JWT_SECRET not configured"); })()
);

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (
  process.env.NODE_ENV === "development" 
    ? "dev-only-refresh-secret-change-in-production" 
    : (() => { throw new Error("JWT_REFRESH_SECRET not configured"); })()
);

// Token expiration times
const ACCESS_TOKEN_EXPIRY = "1h"; // 1 hour
const REFRESH_TOKEN_EXPIRY = "30d"; // 30 days

export interface JWTPayload {
  userId: string;
  username: string;
  role: string;
}

export interface RefreshTokenPayload {
  userId: string;
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

/**
 * Verify access token
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as RefreshTokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Hash refresh token for secure storage
 */
export async function hashRefreshToken(token: string): Promise<string> {
  // Use bcrypt with cost factor 12 for strong hashing
  return await bcrypt.hash(token, 12);
}

/**
 * Verify refresh token against stored hash
 */
export async function verifyRefreshTokenHash(token: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(token, hash);
}

/**
 * Middleware to authenticate requests using JWT or session
 * Supports both authentication methods for backward compatibility
 */
export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  // Check for JWT token in Authorization header
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const payload = verifyAccessToken(token);
    
    if (payload) {
      // Set session-like data for compatibility with existing code
      req.session.userId = payload.userId;
      req.session.userRole = payload.role;
      return next();
    }
  }
  
  // If no valid JWT, check for session-based auth (existing system)
  if (req.session.userId) {
    return next();
  }
  
  // No valid authentication found
  return res.status(401).json({ error: "Unauthorized" });
}

/**
 * Optional authentication middleware - doesn't require auth but sets user if available
 */
export function optionalAuthenticateJWT(req: Request, res: Response, next: NextFunction) {
  // Check for JWT token in Authorization header
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const payload = verifyAccessToken(token);
    
    if (payload) {
      req.session.userId = payload.userId;
      req.session.userRole = payload.role;
    }
  }
  
  // Continue regardless of authentication status
  next();
}
