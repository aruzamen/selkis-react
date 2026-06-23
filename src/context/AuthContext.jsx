import React, { createContext, useContext, useState, useCallback } from "react";
import { loginUser } from "../api/apiService";
import { saveSession, loadSession, clearSession } from "../models";

// ─── AuthContext ───────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Rehydrate from sessionStorage on mount (User model is reconstructed via hydrateUser)
  const [session, setSession] = useState(() => loadSession());
  const [loading, setLoading]  = useState(false);
  const [error, setError]      = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const newSession = await loginUser(credentials); // returns AuthSession
      saveSession(newSession);
      setSession(newSession);
    } catch (err) {
      setError(err.message);
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
    <AuthContext.Provider
      value={{
        user:    session?.user ?? null,    // User model
        session,                           // Full AuthSession
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
