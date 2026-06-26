"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { loginUser, type LoginCredentials } from "../api/apiService";
import { saveSession, loadSession, clearSession } from "../models";
import type { AuthSession } from "../models/AuthSession";
import type { User } from "../models/User";

// ─── Auth Context ─────────────────────────────────────────────────────────────

interface AuthContextValue {
  user:    User | null;
  session: AuthSession | null;
  loading: boolean;
  error:   string | null;
  login:   (credentials: LoginCredentials) => Promise<void>;
  logout:  () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // loadSession reads sessionStorage — safe here because this is a Client Component
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const newSession = await loginUser(credentials);
      saveSession(newSession);
      setSession(newSession);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
