import crypto from "node:crypto";

const rawPassword = process.argv[2];

if (!rawPassword) {
  console.error("Usage: node scripts/generate-admin-password-hash.mjs <password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(rawPassword, salt, 64).toString("hex");
console.log(`${salt}:${hash}`);
