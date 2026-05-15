"use client";
import { NyxMark } from "./NyxMark";
import { IconSettings, IconChat, IconDot } from "../ui/Icons";

interface TopBarProps {
  sessionName: string;
  elapsed: string;
  agentCount: number;
  chatOpen: boolean;
  onToggleChat: () => void;
}

export function TopBar({
  sessionName,
  elapsed,
  agentCount,
  chatOpen,
  onToggleChat,
}: TopBarProps) {
  return (
    <header
      style={{
        height: 56,
        padding: "0 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--line)",
        background: "var(--bg)",
        flex: "0 0 56px",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
        <NyxMark />
        <div style={{ width: 1, height: 18, background: "var(--line-2)" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            lineHeight: 1,
          }}
        >
          <div className="micro" style={{ color: "var(--text-dim)" }}>
            SESSION
          </div>
          <div
            style={{
              fontSize: 13,
              color: "var(--text)",
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            {sessionName}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid var(--line-2)",
            background: "rgba(255,255,255,0.015)",
          }}
        >
          <IconDot size={6} color="var(--ok)" />
          <span className="mono" style={{ fontSize: 11, color: "var(--text-2)" }}>
            LIVE
          </span>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <span className="num" style={{ fontSize: 11, color: "var(--text-mute)" }}>
            {elapsed}
          </span>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-mute)" }}>
            {agentCount} AGENTS
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <button
          title="Settings"
          style={{
            width: 32,
            height: 32,
            display: "grid",
            placeItems: "center",
            color: "var(--text-2)",
            borderRadius: 8,
            border: "1px solid transparent",
          }}
        >
          <IconSettings size={16} />
        </button>
        <button
          onClick={onToggleChat}
          title="Toggle chat"
          style={{
            width: 32,
            height: 32,
            display: "grid",
            placeItems: "center",
            color: chatOpen ? "var(--text)" : "var(--text-2)",
            borderRadius: 8,
            border: `1px solid ${chatOpen ? "var(--line-2)" : "transparent"}`,
            background: chatOpen ? "var(--surface-2)" : "none",
          }}
        >
          <IconChat size={16} />
        </button>
      </div>
    </header>
  );
}
