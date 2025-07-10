import { encryptData, decryptData } from "./doEncrypt";
import { AuthTokenState } from "../components/auth/types";

export const saveAuthState = (auth: AuthTokenState) => {
  const now = Date.now();
  const expiresInMs = auth.remainingTime || 0;
  const authWithTimestamp = {
    ...auth,
    _savedAt: now,
    _expiresAt: now + expiresInMs,
  };
  localStorage.setItem("auth", encryptData(authWithTimestamp));
};

export const loadAuthState = (): AuthTokenState | null => {
  const encrypted = localStorage.getItem("auth");
  if (!encrypted) return null;

  try {
    const decrypted = decryptData(encrypted);
    const now = Date.now();

    if (decrypted._expiresAt && decrypted._expiresAt > now) {
      const { _savedAt, _expiresAt, ...validAuth } = decrypted;
      return validAuth as AuthTokenState;
    }

    // Expired: cleanup
    localStorage.removeItem("auth");
    return null;
  } catch (err) {
    console.error("🔐 Failed to decrypt auth state:", err);
    localStorage.removeItem("auth");
    return null;
  }
};