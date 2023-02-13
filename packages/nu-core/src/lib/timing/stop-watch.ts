/**
 * ## StopWatch
 * This class generates a stopwatch so you can find out how long it takes to complete any given action.
 * You can start, stop, restart and resume this stopwatch at any time.
 */
export class StopWatch {
  private startTime: number | null = null;
  private endTime: number | null = null;

  /**
   * This method returns the total elapsed time by milliseconds.
   * It returns a 0 value if the stopwatch already never started.
   */
  public get elapsedTime(): number {
    if (this.startTime === null || this.endTime === null) return 0;
    return this.endTime - this.startTime;
  }

  /**
   * This method is used to start the stopwatch.
   */
  public Start(): void {
    this.startTime = Date.now();
  }

  /**
   * This method stops the stopwatch and returns the total elapsed time by milliseconds.
   * However, the elapsed time is not reset.
   * @returns Total Elapsed Time
   */
  public Stop(): number {
    if (this.startTime === null) throw new Error("Watch cannot stopped.");
    this.endTime = Date.now();
    return this.elapsedTime;
  }

  /**
   * This method stops the stopwatch.
   * Also, it stops the stopwatch, if the stopwatch currently is running.
   */
  public Reset(): void {
    this.startTime = null;
    this.endTime = null;
  }

  /**
   * This method resumes your stopwatch.
   */
  public Resume(): void {
    this.endTime = null;
  }
}
