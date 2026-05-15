"use client";
import { useActionState } from "react";
import Link from "next/link";
import { signUpWithEmail } from "./actions";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <div
      style={{
        width: "min(400px, 100%)",
        background: "var(--surface)",
        border: "1px solid var(--line-2)",
        borderRadius: 14,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <defs>
            <mask id="moonSignUp">
              <rect width="22" height="22" fill="#fff" />
              <circle cx="14.5" cy="11" r="7" fill="#000" />
            </mask>
          </defs>
          <circle cx="11" cy="11" r="8" fill="var(--bone)" mask="url(#moonSignUp)" />
        </svg>
        <span
          style={{
            fontFamily: "var(--mono)",
            letterSpacing: "0.22em",
            fontSize: 13,
            color: "var(--text)",
            fontWeight: 500,
          }}
        >
          NYX
        </span>
      </div>

      <div>
        <div className="micro" style={{ color: "var(--text-dim)" }}>
          CREATE ACCOUNT
        </div>
        <div style={{ fontSize: 18, color: "var(--text)", marginTop: 6 }}>
          Join Nyx
        </div>
      </div>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor="name"
            style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--mono)" }}
          >
            NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            style={{
              padding: "10px 12px",
              background: "var(--surface-2)",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--text)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor="email"
            style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--mono)" }}
          >
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            style={{
              padding: "10px 12px",
              background: "var(--surface-2)",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--text)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor="password"
            style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--mono)" }}
          >
            PASSWORD
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            style={{
              padding: "10px 12px",
              background: "var(--surface-2)",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--text)",
            }}
          />
        </div>

        {state?.error && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "rgba(168, 85, 75, 0.10)",
              border: "1px solid rgba(168, 85, 75, 0.35)",
              color: "var(--brick)",
              fontSize: 12.5,
            }}
          >
            {state.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "11px",
            borderRadius: 8,
            background: "var(--surface-3)",
            border: "1px solid var(--line-2)",
            color: "var(--text)",
            fontSize: 13,
            fontFamily: "var(--mono)",
            letterSpacing: "0.06em",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p style={{ fontSize: 12, color: "var(--text-mute)", textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/sign-in" style={{ color: "var(--bone)" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
