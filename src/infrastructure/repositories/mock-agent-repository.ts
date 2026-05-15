import type { IAgentRepository } from "@/domain/repositories/agent-repository";
import type { Agent } from "@/domain/entities/agent";
import { ROSTER, AVAILABLE } from "../data/roster";

export class MockAgentRepository implements IAgentRepository {
  async getRoster(): Promise<Agent[]> {
    return [...ROSTER];
  }

  async getAvailable(): Promise<Agent[]> {
    return [...AVAILABLE];
  }

  async getById(id: string): Promise<Agent | null> {
    return [...ROSTER, ...AVAILABLE].find((a) => a.id === id) ?? null;
  }
}
