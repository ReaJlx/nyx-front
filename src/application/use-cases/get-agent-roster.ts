import type { IAgentRepository } from "@/domain/repositories/agent-repository";
import type { Agent } from "@/domain/entities/agent";

export class GetAgentRoster {
  constructor(private readonly repo: IAgentRepository) {}

  async execute(): Promise<{ roster: Agent[]; available: Agent[] }> {
    const [roster, available] = await Promise.all([
      this.repo.getRoster(),
      this.repo.getAvailable(),
    ]);
    return { roster, available };
  }
}
