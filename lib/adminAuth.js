import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

function timingSafeEqualString(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function signPayload(payloadBase64) {
  const secret = getRequiredEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update(payloadBase64).digest("base64url");
}

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function verifyPasswordHash(rawPassword, storedHash) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) {
    return false;
  }
  const candidateHash = hashPassword(rawPassword, salt);
  return timingSafeEqualString(candidateHash, hash);
}

export function createPasswordHash(rawPassword) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashPassword(rawPassword, salt);
  return `${salt}:${hash}`;
}

export function createAdminSessionToken() {
  const payload = {
    role: "admin",
    exp: Date.now() + SESSION_DURATION_MS
  };
  const payloadBase64 = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function verifyAdminSessionToken(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) {
    return false;
  }

  const expectedSignature = signPayload(payloadBase64);
  if (!timingSafeEqualString(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8"));
    return payload.role === "admin" && typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function isValidAdminLogin(email, password) {
  const adminEmail = getRequiredEnv("ADMIN_EMAIL");
  const passwordHash = getRequiredEnv("ADMIN_PASSWORD_HASH");
  const isEmailMatch = timingSafeEqualString(String(email).trim().toLowerCase(), adminEmail.trim().toLowerCase());
  const isPasswordMatch = verifyPasswordHash(password, passwordHash);
  return isEmailMatch && isPasswordMatch;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000
  };
}
