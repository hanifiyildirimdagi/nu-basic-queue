interface IQueueSettings {
  /**
   * Its defines transition time (milliseconds)  per message.
   * Min value is 50
   * @default 100
   * @type number
   */
  QueueCoolDownTime: number;
}

export default class QueueSettings implements IQueueSettings {
  private _queueCoolDownTime: number = 100;

  public get QueueCoolDownTime(): number {
    return this._queueCoolDownTime;
  }
  public set QueueCoolDownTime(value: number) {
    if (value < 50) {
      this._queueCoolDownTime = 50;
      return;
    }
    this._queueCoolDownTime = value;
  }

  constructor() {}
}
