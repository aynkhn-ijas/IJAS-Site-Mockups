import { createHash, timingSafeEqual } from "node:crypto";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function passwordsMatch(provided, expected) {
  const left = createHash("sha256").update(String(provided ?? ""), "utf8").digest();
  const right = createHash("sha256").update(String(expected ?? ""), "utf8").digest();
  return timingSafeEqual(left, right);
}
