import { createUser, hydrateUser } from "./User";

// ─── AuthSession Model ────────────────────────────────────────────────────────

const SESSION_KEY  = "katalog_session";
const SESSION_TTL  = 8 * 60 * 60 * 1000; // 8 hours in ms

/**
 * @typedef {Object} AuthSession
 * @property {User}   user
 * @property {string} token
 * @property {number} expiresAt  - Unix timestamp (ms)
 */

/**
 * Create a new AuthSession from a raw API login response.
 * @param {{ user: Object, token: string }} raw
 * @returns {AuthSession}
 */
export const createAuthSession = ({ user: rawUser, token }) => ({
  user:      createUser(rawUser),
  token,
  expiresAt: Date.now() + SESSION_TTL,
});

/**
 * Persist an AuthSession to sessionStorage.
 * @param {AuthSession} session
 */
export const saveSession = (session) => {
  try {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        user:      session.user.toJSON(),
        token:     session.token,
        expiresAt: session.expiresAt,
      })
    );
  } catch {
    // storage unavailable — continue without persistence
  }
};

/**
 * Load and rehydrate an AuthSession from sessionStorage.
 * Returns null if absent or expired.
 * @returns {AuthSession | null}
 */
export const loadSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
      clearSession();
      return null;
    }
    return {
      user:      hydrateUser(parsed.user),
      token:     parsed.token,
      expiresAt: parsed.expiresAt,
    };
  } catch {
    return null;
  }
};

/**
 * Remove the session from sessionStorage.
 */
export const clearSession = () => {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* noop */ }
};
