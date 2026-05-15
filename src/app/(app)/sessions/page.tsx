import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const { data: session } = await auth.getSession();
  if (!session?.session) redirect("/sign-in");
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 24,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="32" height="32" viewBox="0 0 22 22" aria-label="Nyx">
          <defs>
            <mask id="moonMaskHome">
              <rect width="22" height="22" fill="#fff" />
              <circle cx="14.5" cy="11" r="7" fill="#000" />
            </mask>
          </defs>
          <circle
            cx="11"
            cy="11"
            r="8"
            fill="var(--bone)"
            mask="url(#moonMaskHome)"
          />
        </svg>
        <div
          style={{
            fontFamily: "var(--mono)",
            letterSpacing: "0.22em",
            fontSize: 18,
            color: "var(--text)",
            fontWeight: 500,
          }}
        >
          NYX
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <div className="micro" style={{ color: "var(--text-dim)", marginBottom: 8 }}>
          ACTIVE SESSIONS
        </div>
        <div style={{ fontSize: 14, color: "var(--text-mute)" }}>
          Your ongoing sessions will appear here once connected to the backend.
        </div>
      </div>

      {/* Demo session */}
      <Link
        href="/session/atelier"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 20px",
          background: "var(--surface)",
          border: "1px solid var(--line-2)",
          borderRadius: 12,
          width: "min(400px, 100%)",
        }}
      >
        <div>
          <div
            style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}
          >
            Atelier · Tuesday salon
          </div>
          <div
            style={{ fontSize: 12, color: "var(--text-mute)", marginTop: 3 }}
          >
            4 agents · demo session
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(127, 166, 138, 0.08)",
            border: "1px solid rgba(127, 166, 138, 0.25)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--ok)",
            }}
          />
          <span
            className="mono"
            style={{ fontSize: 10.5, color: "var(--ok)" }}
          >
            LIVE
          </span>
        </div>
      </Link>
    </div>
  );
}
