import type { IMessageRepository } from "@/domain/repositories/message-repository";
import type { Message } from "@/domain/entities/message";
import { SEED_MESSAGES } from "../data/roster";

export class MockMessageRepository implements IMessageRepository {
  private store: Map<string, Message[]> = new Map();

  async getBySessionId(sessionId: string): Promise<Message[]> {
    if (!this.store.has(sessionId)) {
      this.store.set(sessionId, [...SEED_MESSAGES]);
    }
    return this.store.get(sessionId)!;
  }

  async send(sessionId: string, who: string, body: string): Promise<Message> {
    const messages = await this.getBySessionId(sessionId);
    const msg: Message = {
      id: `msg-${Date.now()}`,
      who,
      timestamp: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      body,
    };
    messages.push(msg);
    return msg;
  }
}
