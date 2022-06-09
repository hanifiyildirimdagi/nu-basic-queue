import IBasicQueue from "./IBasicQueue";
import QueueSettings from "./QueueSettings";
import { BasicQueueMessage } from "./BasicQueueMessage";
import { HandlerFunction } from "./types";
import { wait } from "./utils";

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
    if (this._currentMessage === null) return;
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

  Clear(): Array<T> {
    let removedMessages = this._messages.filter((x) => !x.UnAck);
    this._messages = this._messages.filter((x) => !removedMessages.includes(x));
    return removedMessages;
  }

  private async start(): Promise<void> {
    if (this._queueStarted) return;
    this._queueStarted = true;
    while (this._queueStarted) {
      this._currentMessage = this._messages[0];
      await wait(this.Settings.QueueCoolDownTime);
      if (this.Handler === null || this._currentMessage.UnAck === true)
        continue;
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
