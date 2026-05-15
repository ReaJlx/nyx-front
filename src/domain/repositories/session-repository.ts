import type { Session } from "../entities/session";

export interface ISessionRepository {
  getById(id: string): Promise<Session | null>;
  list(): Promise<Session[]>;
  create(name: string): Promise<Session>;
}
