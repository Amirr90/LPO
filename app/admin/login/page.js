"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nextPath, setNextPath] = useState("/admin");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setNextPath(params.get("next") || "/admin");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload?.error || "Unable to login.");
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Unable to login right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-auth-shell">
      <div className="admin-auth-faded-preview" aria-hidden="true">
        <div className="preview-browser">
          <div className="preview-browser-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="preview-nav"></div>
          <div className="preview-grid">
            <div className="preview-card large"></div>
            <div className="preview-card"></div>
            <div className="preview-card"></div>
            <div className="preview-card"></div>
          </div>
        </div>
      </div>
      <section className="admin-card admin-auth-card">
        <p className="admin-auth-badge">Secure Admin Portal</p>
        <h1>Admin Login</h1>
        <p className="admin-auth-subtitle">
          Sign in with your admin credentials to manage website content, services, and enquiries.
        </p>

        <form className="admin-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="adminEmail">Admin Email</label>
          <input
            id="adminEmail"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="adminPassword">Password</label>
          <div className="admin-password-wrap">
            <input
              id="adminPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="admin-password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M4 5 19 20M10.7 10.8A2 2 0 0 0 13.2 13.3M9.9 5.3A10.8 10.8 0 0 1 12 5c5.1 0 9.2 3.9 10 7-0.4 1.4-1.5 3-3.2 4.3M6.5 8.2C5.1 9.3 4.2 10.6 4 12c0.8 3.1 4.9 7 10 7 1 0 2-.1 2.9-.4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="btn btn-primary admin-auth-submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="form-message error" aria-live="polite">
            {error}
          </p>
        </form>
      </section>
    </main>
  );
}
