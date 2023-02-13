import { QueueSettings } from "./QueueSettings";
import { BasicQueueMessage } from "./BasicQueueMessage";
import { HandlerFunction } from "./types";
import { IBasicQueueInterceptors } from "./IBasicQueueInterceptor";

export interface IBasicQueue<T extends BasicQueueMessage> {
  Settings: QueueSettings;
  /**
   * ## ACK
   * You can use it to send an acknowledge in line with the logic you have processed the received message.
   * If `autoAck` is `true` then you don't need to use it.
   * @public
   */
  Ack(): void;
  /**
   * ## Publish a Message
   * Used to send a new message to the queue.
   * If there is a consumer defined in the queue, the message is sent to the consumer.
   * @param message : BasicQueueMessage
   */
  PushMessage(message: T): void;
  /**
   * ## Register Consumer
   * @param handler : HandlerFunction<T>
   * @param autoAck : boolean
   */
  Consume(handler: HandlerFunction<T>, autoAck: boolean): void;

  /**
   * ## Count of Unacked Messages
   */
  get MessageCount(): number;

  /**
   * ## Clear All Messages
   * This method removes all queued and un-acked messages from the queue and returns the removed messages.
   * @returns Removed Message List
   */
  Clear(): Array<T>;

  /**
   * ## Force Stop Queue Flow
   * This method forces the stop queue flow.
   */
  Stop(): void;

  /**
   * ## Interceptorss
   */
  Intercept: IBasicQueueInterceptors;
}
