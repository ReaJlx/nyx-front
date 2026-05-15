import type { Agent } from "./agent";
import type { Message } from "./message";

export interface Session {
  id: string;
  name: string;
  agents: Agent[];
  messages: Message[];
  startedAt: Date;
}
