import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.AUTH_SECRET || "default-secret-key";

export function encryptText(text: string): string {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

export function decryptText(encryptedText: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function hashPassword(password: string): string {
  return CryptoJS.SHA256(password).toString();
}

export function verifyPassword(password: string, hash: string): boolean {
  return CryptoJS.SHA256(password).toString() === hash;
}
