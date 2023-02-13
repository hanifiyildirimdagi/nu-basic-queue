/* eslint-disable @typescript-eslint/ban-types */
export interface IBasicQueueEvents {
  onCleared(callback: Function): void;
  onStarted(callback: Function): void;
}
