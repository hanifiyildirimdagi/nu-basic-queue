/* eslint-disable @typescript-eslint/no-empty-function */
interface IQueueSettings {
  /**
   * Its defines transition time (milliseconds)  per message.
   * @type number
   */
  QueueCoolDownTime: number;
  /**
   * Its defines restart time (milliseconds)  per message.
   * Min value is 100
   * @default 100
   * @type number
   */
  QueueRestartTime: number;
}

export class QueueSettings implements IQueueSettings {
  private _queueRestartTime = 100;
  public get QueueRestartTime(): number {
    return this._queueRestartTime;
  }
  public set QueueRestartTime(value: number) {
    if (value < 100) this._queueRestartTime = 100;
    else this._queueRestartTime = value;
  }

  public QueueCoolDownTime = 0;
  constructor() {}
}
