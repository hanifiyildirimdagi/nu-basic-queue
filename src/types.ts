import { BasicQueueMessage } from "./BasicQueueMessage";

export type HandlerFunction<T extends BasicQueueMessage> = (
  message: T
) => Promise<void>;
