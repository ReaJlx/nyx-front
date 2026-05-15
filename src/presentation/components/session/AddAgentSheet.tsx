"use client";
import { IconClose, IconAdd } from "../ui/Icons";
import type { Agent } from "@/domain/entities/agent";

interface AddAgentSheetProps {
  pool: Agent[];
  onAdd: (agent: Agent) => void;
  onClose: () => void;
}

function RosterCard({ agent, onAdd }: { agent: Agent; onAdd: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid var(--line)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          flex: "0 0 40px",
          background: `radial-gradient(circle at 35% 30%, ${agent.palette.core}, ${agent.palette.edge} 58%, ${agent.palette.rim} 100%)`,
          boxShadow: "inset -8px -10px 14px rgba(0,0,0,0.35)",
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12.5,
              letterSpacing: "0.12em",
              color: "var(--text)",
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
        <div style={{ fontSize: 12.5, color: "var(--text-mute)", marginTop: 3 }}>
          {agent.sample[0]}
        </div>
      </div>
      <button
        onClick={onAdd}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 12px",
          borderRadius: 999,
          background: "var(--surface-2)",
          border: "1px solid var(--line-2)",
          color: "var(--text)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
        }}
      >
        <IconAdd size={14} />
        invite
      </button>
    </div>
  );
}

export function AddAgentSheet({ pool, onAdd, onClose }: AddAgentSheetProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(8, 9, 11, 0.6)",
        backdropFilter: "blur(4px)",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        className="nyx-fade"
        style={{
          width: "min(640px, 100%)",
          background: "var(--bg-2)",
          border: "1px solid var(--line-2)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "20px 22px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <div className="micro" style={{ color: "var(--text-dim)" }}>
              ADD AGENT
            </div>
            <div style={{ fontSize: 17, marginTop: 4 }}>
              Invite to this session
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--text-mute)",
                marginTop: 4,
              }}
            >
              Each agent joins with its own perspective. You can drop any of
              them at any time.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              display: "grid",
              placeItems: "center",
              color: "var(--text-mute)",
              borderRadius: 8,
              border: "1px solid var(--line-2)",
            }}
          >
            <IconClose size={14} />
          </button>
        </div>

        <div
          style={{
            padding: 12,
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 6,
          }}
        >
          {pool.length === 0 ? (
            <div
              style={{
                color: "var(--text-mute)",
                padding: 32,
                textAlign: "center",
              }}
            >
              Everyone is already here.
            </div>
          ) : (
            pool.map((a) => (
              <RosterCard key={a.id} agent={a} onAdd={() => onAdd(a)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
