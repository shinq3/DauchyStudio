import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { db } from './db';
import { adminSessions, adminUsers, AdminUser } from '@shared/schema';
import { eq, and, gt, lt } from 'drizzle-orm';

const SALT_ROUNDS = 10;
const SESSION_DURATION_HOURS = 24;

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify a password against a hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate a random session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create a new admin session
export async function createSession(adminUserId: string): Promise<string> {
  const token = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + SESSION_DURATION_HOURS);

  await db.insert(adminSessions).values({
    adminUserId,
    token,
    expiresAt
  });

  return token;
}

// Validate a session token and return the admin user
export async function validateSession(token: string): Promise<AdminUser | null> {
  const session = await db
    .select()
    .from(adminSessions)
    .where(
      and(
        eq(adminSessions.token, token),
        gt(adminSessions.expiresAt, new Date())
      )
    )
    .limit(1);

  if (session.length === 0) {
    return null;
  }

  const admin = await db
    .select()
    .from(adminUsers)
    .where(
      and(
        eq(adminUsers.id, session[0].adminUserId),
        eq(adminUsers.isActive, true)
      )
    )
    .limit(1);

  return admin.length > 0 ? admin[0] : null;
}

// Delete a session (logout)
export async function deleteSession(token: string): Promise<void> {
  await db.delete(adminSessions).where(eq(adminSessions.token, token));
}

// Delete expired sessions (cleanup)
export async function deleteExpiredSessions(): Promise<void> {
  const now = new Date();
  await db.delete(adminSessions).where(
    lt(adminSessions.expiresAt, now)
  );
}

// Extend type definitions for Express
declare global {
  namespace Express {
    interface Request {
      adminUser?: AdminUser;
    }
  }
}

// Authentication middleware
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.cookies?.admin_session;

  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  const admin = await validateSession(token);

  if (!admin) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  req.adminUser = admin;
  next();
}

// Role-based authorization middleware
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.adminUser) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.adminUser.role)) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        required: allowedRoles,
        current: req.adminUser.role
      });
      return;
    }

    next();
  };
}

// Permission-based authorization middleware
export function requirePermission(...requiredPermissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.adminUser) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const userPermissions = (req.adminUser.permissions as string[]) || [];
    const hasPermission = requiredPermissions.every(perm => 
      userPermissions.includes(perm)
    );

    if (!hasPermission) {
      res.status(403).json({ 
        error: 'Insufficient permissions',
        required: requiredPermissions,
        current: userPermissions
      });
      return;
    }

    next();
  };
}
