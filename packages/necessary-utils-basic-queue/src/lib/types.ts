import { BasicQueueMessage } from "./BasicQueueMessage";

export type HandlerFunction<T extends BasicQueueMessage> = (
  message: T
) => Promise<void>;

export type CustomizeInterceptorHandler<T extends BasicQueueMessage> = (
  messageCount: number,
  currentMessage: T | null
) => Promise<boolean>;
