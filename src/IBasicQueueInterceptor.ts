import { BasicQueueMessage } from "./BasicQueueMessage";
import { CustomizeInterceptorHandler } from "./types";

export interface IBasicQueueInterceptors {
  WhenAnyMessage(): IBasicQueueInterceptors;
  WhenZeroMessage(): IBasicQueueInterceptors;
  When<T extends BasicQueueMessage>(
    handler: CustomizeInterceptorHandler<T>
  ): Promise<IBasicQueueInterceptors>;
  WhenQueueStopped(): IBasicQueueInterceptors;
  WhenQueueStarted(): IBasicQueueInterceptors;
}
