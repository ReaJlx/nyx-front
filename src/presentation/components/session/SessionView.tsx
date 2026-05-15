"use client";
import { useState, useMemo } from "react";
import { TopBar } from "../layout/TopBar";
import { AgentTile } from "./AgentTile";
import { ControlBar } from "./ControlBar";
import { ChatPanel } from "./ChatPanel";
import { AddAgentSheet } from "./AddAgentSheet";
import {
  SessionProvider,
  useSession,
} from "@/presentation/context/session-context";
import { useVoiceSim } from "@/presentation/hooks/use-voice-sim";
import { formatElapsed } from "@/presentation/hooks/use-elapsed-time";

function SessionInner() {
  const {
    sessionName,
    agents,
    available,
    activeId,
    messages,
    self,
    setSelf,
    elapsedSec,
    latencies,
    addAgent,
    removeAgent,
    sendMessage,
  } = useSession();

  const [chatOpen, setChatOpen] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const agentIds = useMemo(() => agents.map((a) => a.id), [agents]);
  const levels = useVoiceSim(agentIds, activeId);

  const n = agents.length;
  const cols = n <= 1 ? 1 : n <= 4 ? 2 : n <= 6 ? 3 : 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
      }}
    >
      <TopBar
        sessionName={sessionName}
        elapsed={formatElapsed(elapsedSec)}
        agentCount={agents.length}
        chatOpen={chatOpen}
        onToggleChat={() => setChatOpen((v) => !v)}
      />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <div
          style={{
            position: "relative",
            flex: 1,
            minWidth: 0,
            padding: "20px 24px 108px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
              gridAutoRows: "1fr",
              gap: 14,
            }}
          >
            {agents.map((a) => (
              <AgentTile
                key={a.id}
                agent={a}
                level={levels[a.id] ?? 0}
                speaking={a.id === activeId}
                muted={false}
                latencyMs={latencies[a.id] ?? 42}
                onRemove={() => removeAgent(a.id)}
              />
            ))}
          </div>

          <ControlBar
            self={self}
            setSelf={setSelf}
            onAdd={() => setAddOpen(true)}
            onLeave={() => {}}
          />
        </div>

        {chatOpen && (
          <ChatPanel
            agents={agents}
            messages={messages}
            onSend={sendMessage}
            onClose={() => setChatOpen(false)}
          />
        )}
      </div>

      {addOpen && (
        <AddAgentSheet
          pool={available}
          onAdd={(a) => {
            addAgent(a);
            setAddOpen(false);
          }}
          onClose={() => setAddOpen(false)}
        />
      )}
    </div>
  );
}

export function SessionView() {
  return (
    <SessionProvider>
      <SessionInner />
    </SessionProvider>
  );
}
