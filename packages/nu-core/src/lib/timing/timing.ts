export class Timing {
  /**
   * ## Sleep
   * This static method allows you to wait a certain amount of time with the async/await method.
   * @param ms
   * @example await Wait(1000) | await Wait(TimeSpan.FromSeconds(1))
   * @example
   * doSomething...
   * await Timing.Wait(TimeSpan.FromMinute(1))
   * continue...
   */
  public static async Sleep(ms: number): Promise<unknown> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * ## CancellationWork
   * This static method allows a job to be done only once, within a period of time you specify.
   * For example, you produce a console output every time a character is entered into the input box.
   * But you want to produce results when the user is no longer entering data for a second.
   * You can use `CancellationWork` for this and similar operations.
   * @static
   * @param callback : CancellationWorkCallback
   * @example
   *
   * import { Timing } from "necessary-utils-core";
   *
   * const work = () => {
   *   console.log("Hello.");
   * };
   * Timing.CancellationWork(work, 1000);
   * Timing.CancellationWork(work, 1000);
   * Timing.CancellationWork(work, 1000);
   * Timing.CancellationWork(work, 1000);
   * Timing.CancellationWork(work, 1000);
   * // Output : Hello. One time.
   */
  public static CancellationWork = (function () {
    let timer: NodeJS.Timeout;
    return function (callback: CancellationWorkCallback, ms: number) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();
}

type CancellationWorkCallback = () => void;
