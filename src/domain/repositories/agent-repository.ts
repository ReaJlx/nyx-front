import type { Agent } from "../entities/agent";

export interface IAgentRepository {
  getRoster(): Promise<Agent[]>;
  getAvailable(): Promise<Agent[]>;
  getById(id: string): Promise<Agent | null>;
}
