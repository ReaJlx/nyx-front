import { MockAgentRepository } from "@/infrastructure/repositories/mock-agent-repository";
import { MockMessageRepository } from "@/infrastructure/repositories/mock-message-repository";
import { MockSessionRepository } from "@/infrastructure/repositories/mock-session-repository";

// Swap these for real implementations when a backend exists
export const agentRepository = new MockAgentRepository();
export const messageRepository = new MockMessageRepository();
export const sessionRepository = new MockSessionRepository();
