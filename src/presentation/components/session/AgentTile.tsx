"use client";
import { Blob } from "./Blob";
import { IconDot, IconClose, IconMicOff } from "../ui/Icons";
import type { Agent } from "@/domain/entities/agent";

interface AgentTileProps {
  agent: Agent;
  level: number;
  speaking: boolean;
  muted: boolean;
  latencyMs: number;
  onRemove: () => void;
}

export function AgentTile({
  agent,
  level,
  speaking,
  muted,
  latencyMs,
  onRemove,
}: AgentTileProps) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 0,
        borderRadius: 14,
        border: `1px solid ${speaking ? "var(--line-3)" : "var(--line)"}`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(180deg, ${agent.bgTint}, transparent 60%), var(--surface)`,
      }}
    >
      {/* Top-left */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 14,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12.5,
              letterSpacing: "0.12em",
              color: "var(--text)",
              fontWeight: 500,
            }}
          >
            {agent.name}
          </span>
          <span
            style={{ fontSize: 12, color: "var(--text-mute)", fontStyle: "italic" }}
          >
            · {agent.role}
          </span>
        </div>
        <div className="micro" style={{ color: "var(--text-dim)" }}>
          MODEL · NYX-{agent.id.slice(0, 2).toUpperCase()}-04
        </div>
      </div>

      {/* Top-right */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span className="num" style={{ fontSize: 11, color: "var(--text-mute)" }}>
          {latencyMs}
          <span style={{ opacity: 0.55 }}>ms</span>
        </span>
        {speaking && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 8px",
              borderRadius: 999,
              background: "rgba(201,184,160,0.06)",
              border: "1px solid rgba(201,184,160,0.25)",
              color: "var(--bone)",
            }}
          >
            <IconDot size={5} color="var(--bone)" />
            <span
              className="mono"
              style={{ fontSize: 9.5, letterSpacing: "0.1em" }}
            >
              SPEAKING
            </span>
          </div>
        )}
        <button
          title="Drop agent"
          onClick={onRemove}
          style={{
            width: 22,
            height: 22,
            display: "grid",
            placeItems: "center",
            color: "var(--text-dim)",
            borderRadius: 6,
            border: "1px solid transparent",
          }}
        >
          <IconClose size={12} />
        </button>
      </div>

      {/* Blob */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: "32px 20px 36px",
        }}
      >
        <Blob
          palette={agent.palette}
          level={level}
          speaking={speaking}
          seed={agent.seed}
          size={360}
        />
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IconDot
            size={5}
            color={speaking ? agent.palette.core : "var(--text-dim)"}
          />
          <span
            className="mono"
            style={{
              fontSize: 10.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-mute)",
            }}
          >
            {speaking ? "transmitting" : "listening"}
          </span>
          <span
            className="num"
            style={{
              fontSize: 10.5,
              color: "var(--text-dim)",
              paddingLeft: 4,
              borderLeft: "1px solid var(--line)",
            }}
          >
            {String(Math.round(level * 100)).padStart(2, "0")}
          </span>
        </div>
        {muted ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 7px 3px 6px",
              borderRadius: 999,
              background: "var(--surface-2)",
              border: "1px solid var(--line-2)",
              color: "var(--text-mute)",
            }}
          >
            <IconMicOff size={11} />
            <span
              className="mono"
              style={{ fontSize: 9.5, letterSpacing: "0.1em" }}
            >
              MUTED
            </span>
          </div>
        ) : (
          <span
            className="mono"
            style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--text-dim)" }}
          >
            ch.{agent.id.slice(0, 3).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
