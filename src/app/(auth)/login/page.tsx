import Link from "next/link";

export default function LoginPage() {
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
            <mask id="moonLogin">
              <rect width="22" height="22" fill="#fff" />
              <circle cx="14.5" cy="11" r="7" fill="#000" />
            </mask>
          </defs>
          <circle cx="11" cy="11" r="8" fill="var(--bone)" mask="url(#moonLogin)" />
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
          SIGN IN
        </div>
        <div style={{ fontSize: 18, color: "var(--text)", marginTop: 6 }}>
          Welcome back
        </div>
      </div>

      {/* Stack Auth <SignIn /> will be placed here after Neon auth setup */}
      <div
        style={{
          padding: "20px",
          border: "1px solid var(--line)",
          borderRadius: 10,
          color: "var(--text-mute)",
          fontSize: 13,
          textAlign: "center",
        }}
      >
        Auth provider loading…
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--text-mute)",
          textAlign: "center",
        }}
      >
        No account?{" "}
        <Link href="/register" style={{ color: "var(--bone)" }}>
          Register
        </Link>
      </p>
    </div>
  );
}
