"use client";
import { useState, useRef, useEffect } from "react";
import { MessageRow } from "./MessageRow";
import { IconClose, IconSend } from "../ui/Icons";
import type { Agent } from "@/domain/entities/agent";
import type { Message } from "@/domain/entities/message";

interface ChatPanelProps {
  agents: Agent[];
  messages: Message[];
  onSend: (body: string) => void;
  onClose: () => void;
}

export function ChatPanel({ agents, messages, onSend, onClose }: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  };

  return (
    <aside
      className="nyx-slide"
      style={{
        width: 360,
        flex: "0 0 360px",
        background: "var(--bg-2)",
        borderLeft: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className="micro" style={{ color: "var(--text-dim)" }}>
            CHANNEL
          </div>
          <div style={{ fontSize: 13, color: "var(--text)", marginTop: 2 }}>
            thread / open
          </div>
        </div>
        <button
          onClick={onClose}
          title="Close panel"
          style={{
            width: 28,
            height: 28,
            display: "grid",
            placeItems: "center",
            color: "var(--text-mute)",
            borderRadius: 7,
            border: "1px solid var(--line-2)",
          }}
        >
          <IconClose size={14} />
        </button>
      </div>

      <div style={{ height: 1, background: "var(--line)" }} />

      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {messages.map((m) => {
          const agent =
            m.who === "self" ? null : agents.find((a) => a.id === m.who) ?? null;
          return (
            <MessageRow
              key={m.id}
              message={m}
              agent={agent}
              isSelf={m.who === "self"}
            />
          );
        })}
      </div>

      <form
        onSubmit={submit}
        style={{
          padding: "10px 12px",
          display: "flex",
          gap: 8,
          borderTop: "1px solid var(--line)",
          background: "var(--bg)",
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type to the room"
          style={{
            flex: 1,
            padding: "10px 12px",
            background: "var(--surface)",
            border: "1px solid var(--line-2)",
            borderRadius: 10,
            fontSize: 13,
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          title="Send"
          style={{
            width: 40,
            height: 40,
            display: "grid",
            placeItems: "center",
            background: "var(--surface-2)",
            border: "1px solid var(--line-2)",
            borderRadius: 10,
            color: "var(--text-2)",
          }}
        >
          <IconSend size={15} />
        </button>
      </form>
    </aside>
  );
}
