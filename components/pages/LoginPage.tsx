"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

interface DemoCredential { email: string; password: string; label: string; }

const DEMO_CREDENTIALS: DemoCredential[] = [
  { email: "admin@selkis.com", password: "admin123", label: "Admin" },
  { email: "buyer@selkis.com", password: "buyer123", label: "Buyer" },
];

interface FormState { email: string; password: string; }
type FieldErrors = Partial<Record<keyof FormState, string>>;

const LoginPage: React.FC = () => {
  const { login, loading, error, user } = useAuth();
  const router = useRouter();

  const [form, setForm]               = useState<FormState>({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => { if (user) router.replace("/products"); }, [user, router]);

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!form.email.trim())                    errs.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email    = "Enter a valid email.";
    if (!form.password)                        errs.password = "Password is required.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    try { await login(form); } catch { /* handled by context */ }
  };

  const inputBase =
    "w-full px-3.5 py-2.5 bg-bg border rounded-xl text-slate-200 text-sm outline-none transition-colors placeholder:text-subtle focus:border-accent";

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-5 py-10">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,.18)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[420px] relative">
        {/* Brand */}
        <div className="text-center mb-9">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent2 text-3xl mb-4 shadow-accent">
            ◈
          </div>
          <h1 className="font-display text-[30px] font-bold bg-gradient-to-r from-slate-200 to-accent2 bg-clip-text text-transparent tracking-tight leading-tight">
            Selkis
          </h1>
          <p className="text-muted text-sm mt-1.5">Product catalog management</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-3xl p-9 shadow-card">
          <h2 className="text-lg font-bold text-slate-200 mb-1">Welcome back</h2>
          <p className="text-muted text-[13px] mb-7">Sign in to access your workspace.</p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-[13px] mb-5">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@company.io"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={`${inputBase} ${fieldErrors.email ? "border-red-500" : "border-border"}`}
              />
              {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className={`${inputBase} ${fieldErrors.password ? "border-red-500" : "border-border"}`}
              />
              {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent2 shadow-accent hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="mt-4 bg-surface border border-border rounded-2xl px-5 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[1px] text-subtle mb-2.5">Demo accounts</p>
          <div className="flex gap-2">
            {DEMO_CREDENTIALS.map((creds) => (
              <button
                key={creds.email}
                onClick={() => setForm({ email: creds.email, password: creds.password })}
                className="flex-1 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent2 text-[12px] font-semibold hover:bg-accent/20 transition-colors"
              >
                {creds.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
