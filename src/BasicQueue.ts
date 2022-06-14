import IBasicQueue from "./IBasicQueue";
import QueueSettings from "./QueueSettings";
import { BasicQueueMessage } from "./BasicQueueMessage";
import { CustomizeInterceptorHandler, HandlerFunction } from "./types";
import { IBasicQueueInterceptors } from "./IBasicQueueInterceptor";
import {Timing} from "necessary-utils-core"

/**
 * # Simple Queue System
 * ### Methods
 * - PushMessage
 * - Comsume
 * - ACK
 * - Clear
 * @example
 * `Define your queue`
 * new SimpleQueue<MessageObject>();
 * @example
 * `Publish a message`
 * new SimpleQueue<MessageObject>().Push(MessageObject);
 * @example
 * `Full example`
 * var queue = new SimpleQueue<MessageObject>();
 * queue.Consume(async (message: MessageObject) => {
 *  do something...
 * });
 * queue.Push(MessageObject);
 */
export default class BasicQueue<T extends BasicQueueMessage>
  implements IBasicQueue<T>
{
  private _messages: Array<T> = [];
  private Handler: HandlerFunction<T> | null = null;
  private AutoACK: boolean = false;
  private _queueStarted: boolean = false;
  private _currentMessage: T | null = null;

  public Settings: QueueSettings;

  constructor(settings: QueueSettings | null = null) {
    if (settings === null) this.Settings = new QueueSettings();
    else this.Settings = settings;
  }

  public Ack(): void {
    if (this._currentMessage === null || this.Handler == null) return;
    const i = this._messages.indexOf(this._currentMessage);
    if (i !== -1) this._messages.splice(i, 1);
    this._currentMessage = null;
    this._queueStarted = this._messages.length > 0;
  }

  public PushMessage(message: T): void {
    this._messages.push(message);
    this.start();
  }

  public Consume(handler: HandlerFunction<T>, autoAck: boolean): void {
    this.Handler = handler;
    this.AutoACK = autoAck;
  }

  public get MessageCount(): number {
    return this._messages.length;
  }

  public Clear(): Array<T> {
    let removedMessages = this._messages.filter((x) => !x.UnAck);
    this._messages = this._messages.filter((x) => !removedMessages.includes(x));
    return removedMessages;
  }

  public Stop(): void {
    this._queueStarted = false;
  }

  public Intercept: IBasicQueueInterceptors = {
    WhenZeroMessage: (): IBasicQueueInterceptors => {
      if (this.MessageCount === 0)
        throw new Error("Zero message count. Process was intercepted.");
      return this.Intercept;
    },
    WhenAnyMessage: (): IBasicQueueInterceptors => {
      if (this.MessageCount > 0)
        throw new Error("Queue contains message. Process was intercepted.");
      return this.Intercept;
    },
    When: async <T extends BasicQueueMessage>(
      handler: CustomizeInterceptorHandler<T>
    ): Promise<IBasicQueueInterceptors> => {
      let currentMessage: T | null = Object.assign(
        {} as T,
        this._currentMessage
      );
      const result = await handler(this.MessageCount, currentMessage);
      if (result !== true)
        throw new Error(
          "Custom handler returns false. Process was intercepted."
        );
      return this.Intercept;
    },
    WhenQueueStarted: (): IBasicQueueInterceptors => {
      if (this._queueStarted)
        throw new Error("Queue processing right now. Process was intercepted.");
      return this.Intercept;
    },
    WhenQueueStopped: (): IBasicQueueInterceptors => {
      if (!this._queueStarted)
        throw new Error("Queue stopped. Process was intercepted.");
      return this.Intercept;
    },
  };

  private async start(): Promise<void> {
    if (this._queueStarted) return;
    this._queueStarted = true;
    while (this._queueStarted) {
      this._currentMessage = this._messages[0];
      if (this.Handler === null || this._currentMessage.UnAck === true) {
        await Timing.Sleep(this.Settings.QueueRestartTime);
        continue;
      }
      await Timing.Sleep(this.Settings.QueueCoolDownTime);
      try {
        this._currentMessage.UnAck = true;
        await this.Handler(this._currentMessage);
      } catch (error) {
        console.error("Consumer Error Ocurred. See the details; \n", error);
      }
      if (this.AutoACK) this.Ack();
    }
  }
}
