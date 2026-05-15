"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { Agent } from "@/domain/entities/agent";
import type { Message } from "@/domain/entities/message";
import { ROSTER, AVAILABLE, SEED_MESSAGES } from "@/infrastructure/data/roster";
import { formatElapsed } from "@/presentation/hooks/use-elapsed-time";

export interface SelfState {
  mic: boolean;
  screen: boolean;
  hand: boolean;
}

interface SessionContextValue {
  sessionName: string;
  agents: Agent[];
  available: Agent[];
  activeId: string;
  messages: Message[];
  self: SelfState;
  setSelf: (updater: (prev: SelfState) => SelfState) => void;
  elapsedSec: number;
  latencies: Record<string, number>;
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
  sendMessage: (body: string) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [agents, setAgents] = useState<Agent[]>(ROSTER);
  const [available, setAvailable] = useState<Agent[]>(AVAILABLE);
  const [activeId, setActiveId] = useState<string>(ROSTER[0].id);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [self, setSelf] = useState<SelfState>({
    mic: true,
    screen: false,
    hand: false,
  });
  const [elapsedSec, setElapsedSec] = useState(1024);
  const [latencies, setLatencies] = useState<Record<string, number>>(() =>
    Object.fromEntries(
      ROSTER.map((a) => [a.id, 28 + Math.floor(Math.random() * 60)])
    )
  );

  useEffect(() => {
    const i = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setLatencies((prev) => {
        const next = { ...prev };
        for (const a of agents) {
          const v = (prev[a.id] ?? 50) + (Math.random() * 8 - 4);
          next[a.id] = Math.max(18, Math.min(140, Math.round(v)));
        }
        return next;
      });
    }, 1400);
    return () => clearInterval(i);
  }, [agents]);

  useEffect(() => {
    let cancel = false;
    const schedule = () => {
      if (cancel) return;
      const others = agents.filter((a) => a.id !== activeId);
      if (!others.length) return;
      setActiveId(others[Math.floor(Math.random() * others.length)].id);
    };
    const t = setTimeout(schedule, 9000 + Math.random() * 6000);
    return () => {
      cancel = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, agents.length]);

  useEffect(() => {
    const speaker = agents.find((a) => a.id === activeId);
    if (!speaker) return;
    const phrase = speaker.sample[Math.floor(Math.random() * speaker.sample.length)];
    const newId = `live-${activeId}-${Date.now()}`;
    const stamp = formatElapsed(elapsedSec).slice(3);
    setMessages((m) => [
      ...m,
      { id: newId, who: speaker.id, timestamp: stamp, body: "", live: true },
    ]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((m) =>
        m.map((msg) =>
          msg.id === newId
            ? { ...msg, body: phrase.slice(0, i), live: i < phrase.length }
            : msg
        )
      );
      if (i >= phrase.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const addAgent = useCallback(
    (a: Agent) => {
      setAgents((prev) => [...prev, a]);
      setAvailable((prev) => prev.filter((p) => p.id !== a.id));
      const stamp = formatElapsed(elapsedSec).slice(3);
      setMessages((m) => [
        ...m,
        {
          id: `join-${Date.now()}`,
          who: a.id,
          timestamp: stamp,
          body: "Joining. I'll start by listening.",
        },
      ]);
    },
    [elapsedSec]
  );

  const removeAgent = useCallback(
    (id: string) => {
      const a = agents.find((x) => x.id === id);
      if (!a) return;
      setAgents((prev) => prev.filter((x) => x.id !== id));
      setAvailable((prev) => [...prev, a]);
      if (activeId === id) {
        const rest = agents.filter((x) => x.id !== id);
        if (rest.length) setActiveId(rest[0].id);
      }
    },
    [agents, activeId]
  );

  const sendMessage = useCallback(
    (body: string) => {
      const stamp = formatElapsed(elapsedSec).slice(3);
      setMessages((m) => [
        ...m,
        { id: `self-${Date.now()}`, who: "self", timestamp: stamp, body },
      ]);
      const speaker = agents.find((a) => a.id === activeId) ?? agents[0];
      if (!speaker) return;
      setTimeout(() => {
        const reply =
          speaker.sample[Math.floor(Math.random() * speaker.sample.length)];
        setMessages((m) => [
          ...m,
          {
            id: `reply-${Date.now()}`,
            who: speaker.id,
            timestamp: formatElapsed(elapsedSec).slice(3),
            body: reply,
          },
        ]);
      }, 1100 + Math.random() * 900);
    },
    [agents, activeId, elapsedSec]
  );

  const value = useMemo(
    () => ({
      sessionName: "Atelier · Tuesday salon",
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
    }),
    [
      agents,
      available,
      activeId,
      messages,
      self,
      elapsedSec,
      latencies,
      addAgent,
      removeAgent,
      sendMessage,
    ]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
