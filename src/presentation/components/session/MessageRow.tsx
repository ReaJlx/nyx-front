import { IconDot } from "../ui/Icons";
import type { Agent } from "@/domain/entities/agent";
import type { Message } from "@/domain/entities/message";

interface MessageRowProps {
  message: Message;
  agent: Agent | null;
  isSelf: boolean;
}

export function MessageRow({ message, agent, isSelf }: MessageRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "28px 1fr",
        gap: 10,
        alignItems: "flex-start",
      }}
    >
      <div style={{ paddingTop: 3 }}>
        {isSelf ? (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: "var(--surface-3)",
              border: "1px solid var(--line-2)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                color: "var(--text-2)",
              }}
            >
              YR
            </span>
          </div>
        ) : agent ? (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, ${agent.palette.core}, ${agent.palette.edge} 65%, ${agent.palette.rim} 100%)`,
            }}
          />
        ) : null}
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 2,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--text)",
            }}
          >
            {isSelf ? "you" : agent?.name?.toLowerCase()}
          </span>
          <span className="num" style={{ fontSize: 10.5, color: "var(--text-dim)" }}>
            {message.timestamp}
          </span>
          {agent && (
            <span
              style={{
                fontSize: 10.5,
                color: "var(--text-mute)",
                fontStyle: "italic",
              }}
            >
              {agent.role}
            </span>
          )}
          {message.live && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "2px 6px",
                borderRadius: 999,
                background: "rgba(201,184,160,0.08)",
                border: "1px solid rgba(201,184,160,0.25)",
                color: "var(--bone)",
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
              }}
            >
              <IconDot size={4} color="var(--bone)" />
              SPEAKING
            </span>
          )}
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: "var(--text-2)",
            lineHeight: 1.55,
          }}
        >
          {message.body}
          {message.live && (
            <span
              style={{
                display: "inline-block",
                marginLeft: 3,
                color: "var(--bone)",
                animation: "nyxBlink 1.05s steps(2,end) infinite",
              }}
            >
              ▍
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
