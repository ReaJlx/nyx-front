import type { ISessionRepository } from "@/domain/repositories/session-repository";
import type { IMessageRepository } from "@/domain/repositories/message-repository";
import type { Session } from "@/domain/entities/session";
import type { Message } from "@/domain/entities/message";

export class JoinSession {
  constructor(
    private readonly sessionRepo: ISessionRepository,
    private readonly messageRepo: IMessageRepository
  ) {}

  async execute(sessionId: string): Promise<{ session: Session; messages: Message[] }> {
    const session = await this.sessionRepo.getById(sessionId);
    if (!session) throw new Error(`Session ${sessionId} not found`);
    const messages = await this.messageRepo.getBySessionId(sessionId);
    return { session, messages };
  }
}
