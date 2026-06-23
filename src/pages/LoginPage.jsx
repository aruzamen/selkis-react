import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_CREDENTIALS = [
  { email: "admin@katalog.io", password: "admin123", label: "Admin" },
  { email: "buyer@katalog.io", password: "buyer123", label: "Buyer" },
];

const LoginPage = () => {
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/products";

  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.password) errs.password = "Password is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFieldErrors(errs); return; }
    setFieldErrors({});
    try {
      await login(form);
    } catch {
      // error handled by context
    }
  };

  const fillDemo = (creds) => setForm({ email: creds.email, password: creds.password });

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--clr-bg)",
        padding: "20px",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              fontSize: "28px",
              marginBottom: "16px",
              boxShadow: "0 8px 24px rgba(99,102,241,.4)",
            }}
          >
            ◈
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "30px",
              fontWeight: 700,
              background: "linear-gradient(135deg, #e2e8f0, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
              lineHeight: 1.2,
            }}
          >
            Katalog
          </h1>
          <p style={{ color: "var(--clr-muted)", marginTop: "6px", fontSize: "14px" }}>
            Product catalog management
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "var(--clr-surface)",
            border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius-xl)",
            padding: "36px",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            Welcome back
          </h2>
          <p style={{ color: "var(--clr-muted)", fontSize: "13px", marginBottom: "28px" }}>
            Sign in to access your workspace.
          </p>

          {/* Server error */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,.1)",
                border: "1px solid rgba(239,68,68,.3)",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                color: "var(--clr-danger)",
                fontSize: "13px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                  color: "var(--clr-text)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@company.io"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "var(--clr-bg)",
                  border: `1px solid ${fieldErrors.email ? "var(--clr-danger)" : "var(--clr-border)"}`,
                  borderRadius: "var(--radius-md)",
                  color: "var(--clr-text)",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color var(--transition)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--clr-accent)")}
                onBlur={(e) => (e.target.style.borderColor = fieldErrors.email ? "var(--clr-danger)" : "var(--clr-border)")}
              />
              {fieldErrors.email && (
                <p style={{ color: "var(--clr-danger)", fontSize: "12px", marginTop: "4px" }}>
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "var(--clr-bg)",
                  border: `1px solid ${fieldErrors.password ? "var(--clr-danger)" : "var(--clr-border)"}`,
                  borderRadius: "var(--radius-md)",
                  color: "var(--clr-text)",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color var(--transition)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--clr-accent)")}
                onBlur={(e) => (e.target.style.borderColor = fieldErrors.password ? "var(--clr-danger)" : "var(--clr-border)")}
              />
              {fieldErrors.password && (
                <p style={{ color: "var(--clr-danger)", fontSize: "12px", marginTop: "4px" }}>
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading
                  ? "var(--clr-surface-2)"
                  : "linear-gradient(135deg, var(--clr-accent), #818cf8)",
                color: "#fff",
                borderRadius: "var(--radius-md)",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity var(--transition)",
                boxShadow: loading ? "none" : "0 4px 14px rgba(99,102,241,.4)",
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo credentials */}
        <div
          style={{
            marginTop: "20px",
            background: "var(--clr-surface)",
            border: "1px solid var(--clr-border)",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "var(--clr-subtle)",
              marginBottom: "10px",
            }}
          >
            Demo accounts
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            {DEMO_CREDENTIALS.map((creds) => (
              <button
                key={creds.email}
                onClick={() => fillDemo(creds)}
                style={{
                  flex: 1,
                  padding: "8px",
                  background: "var(--clr-accent-soft)",
                  border: "1px solid rgba(99,102,241,.3)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--clr-accent-2)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background var(--transition)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clr-accent-soft)")}
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
