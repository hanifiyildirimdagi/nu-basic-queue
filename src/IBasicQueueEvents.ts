export default interface IBasicQueueEvents {
  onCleared(callback: Function): void;
  onStarted(callback: Function): void;
}