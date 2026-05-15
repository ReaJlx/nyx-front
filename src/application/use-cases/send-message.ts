import type { IMessageRepository } from "@/domain/repositories/message-repository";
import type { Message } from "@/domain/entities/message";

export class SendMessage {
  constructor(private readonly repo: IMessageRepository) {}

  async execute(sessionId: string, who: string, body: string): Promise<Message> {
    if (!body.trim()) throw new Error("Message body cannot be empty");
    return this.repo.send(sessionId, who, body.trim());
  }
}
