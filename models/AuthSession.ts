import { createUser, hydrateUser, type User, type UserJSON } from "./User";

// ─── AuthSession Model ────────────────────────────────────────────────────────

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

interface StoredSession {
  user: UserJSON;
  token: string;
  expiresAt: number;
}

const SESSION_KEY = "selkis_session";
const SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

export const createAuthSession = (raw: { user: Record<string, unknown>; token: string }): AuthSession => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user:      createUser(raw.user as any),
  token:     raw.token,
  expiresAt: Date.now() + SESSION_TTL,
});

export const saveSession = (session: AuthSession): void => {
  try {
    const stored: StoredSession = {
      user:      session.user.toJSON(),
      token:     session.token,
      expiresAt: session.expiresAt,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(stored));
  } catch { /* storage unavailable */ }
};

export const loadSession = (): AuthSession | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: StoredSession = JSON.parse(raw);
    if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
      clearSession();
      return null;
    }
    return { user: hydrateUser(parsed.user), token: parsed.token, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* noop */ }
};
