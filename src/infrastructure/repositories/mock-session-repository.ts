import type { ISessionRepository } from "@/domain/repositories/session-repository";
import type { Session } from "@/domain/entities/session";
import { ROSTER } from "../data/roster";

const DEFAULT_SESSION: Session = {
  id: "atelier",
  name: "Atelier · Tuesday salon",
  agents: ROSTER,
  messages: [],
  startedAt: new Date(Date.now() - 1024 * 1000),
};

export class MockSessionRepository implements ISessionRepository {
  private sessions: Session[] = [DEFAULT_SESSION];

  async getById(id: string): Promise<Session | null> {
    return this.sessions.find((s) => s.id === id) ?? null;
  }

  async list(): Promise<Session[]> {
    return [...this.sessions];
  }

  async create(name: string): Promise<Session> {
    const session: Session = {
      id: `session-${Date.now()}`,
      name,
      agents: [],
      messages: [],
      startedAt: new Date(),
    };
    this.sessions.push(session);
    return session;
  }
}
