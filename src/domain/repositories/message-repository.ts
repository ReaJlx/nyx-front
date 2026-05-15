import type { Message } from "../entities/message";

export interface IMessageRepository {
  getBySessionId(sessionId: string): Promise<Message[]>;
  send(sessionId: string, who: string, body: string): Promise<Message>;
}
