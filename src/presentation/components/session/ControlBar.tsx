"use client";
import { useState } from "react";
import {
  IconMic,
  IconMicOff,
  IconScreen,
  IconHand,
  IconAdd,
  IconMore,
  IconLeave,
} from "../ui/Icons";

export interface SelfState {
  mic: boolean;
  screen: boolean;
  hand: boolean;
}

interface ControlBarProps {
  self: SelfState;
  setSelf: (updater: (prev: SelfState) => SelfState) => void;
  onAdd: () => void;
  onLeave: () => void;
}

interface CtrlBtnProps {
  children: React.ReactNode;
  active?: boolean;
  emphasize?: boolean;
  label: string;
  onClick?: () => void;
}

function CtrlBtn({
  children,
  active = true,
  emphasize = false,
  label,
  onClick,
}: CtrlBtnProps) {
  const [hover, setHover] = useState(false);
  const bg =
    emphasize || active ? "var(--surface-2)" : "rgba(168, 85, 75, 0.10)";
  const border =
    emphasize || active ? "var(--line-2)" : "rgba(168, 85, 75, 0.35)";
  const color = active ? "var(--text)" : "var(--brick)";

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      title={label}
      style={{
        height: 40,
        minWidth: 44,
        padding: "0 14px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 999,
        border: `1px solid ${border}`,
        background: bg,
        color,
        transition:
          "transform 120ms ease, background 160ms ease, border-color 160ms ease",
        transform: hover ? "translateY(-1px)" : "none",
      }}
    >
      {children}
    </button>
  );
}

export function ControlBar({ self, setSelf, onAdd, onLeave }: ControlBarProps) {
  const toggle = (k: keyof SelfState) =>
    setSelf((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 999,
        background: "rgba(14, 17, 21, 0.86)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--line-2)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <CtrlBtn
          active={self.mic}
          onClick={() => toggle("mic")}
          label={self.mic ? "Mute" : "Unmute"}
        >
          {self.mic ? <IconMic size={18} /> : <IconMicOff size={18} />}
        </CtrlBtn>
        <CtrlBtn
          active={self.screen}
          onClick={() => toggle("screen")}
          label="Share screen"
        >
          <IconScreen size={18} />
        </CtrlBtn>
        <CtrlBtn
          active={self.hand}
          onClick={() => toggle("hand")}
          label="Raise hand"
        >
          <IconHand size={18} />
        </CtrlBtn>
      </div>

      <div
        style={{ width: 1, height: 22, background: "var(--line)" }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <CtrlBtn onClick={onAdd} label="Add agent" emphasize>
          <IconAdd size={18} />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "lowercase",
              color: "var(--text-2)",
            }}
          >
            add agent
          </span>
        </CtrlBtn>
        <CtrlBtn label="More">
          <IconMore size={18} />
        </CtrlBtn>
      </div>

      <div
        style={{ width: 1, height: 22, background: "var(--line)" }}
      />

      <button
        onClick={onLeave}
        title="Leave session"
        style={{
          height: 40,
          padding: "0 16px",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#e8c7c1",
          background: "rgba(168, 85, 75, 0.18)",
          border: "1px solid rgba(168, 85, 75, 0.45)",
          borderRadius: 999,
        }}
      >
        <IconLeave size={18} />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
          }}
        >
          leave
        </span>
      </button>
    </div>
  );
}
