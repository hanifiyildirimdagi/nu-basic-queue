/**
 * ## TimeSpan
 * Also, this class helps you generate the millisecond values you need.
 */
export class TimeSpan {
  private _hour = 0;
  private _minute = 0;
  private _second = 0;
  private _millisecond = 0;

  public get Hour(): number {
    return this._hour;
  }
  public set Hour(value: number) {
    if (value >= 0) {
      this._hour = value;
      return;
    }
    throw new Error('Hour value cannot be negative.');
  }

  public get Minute(): number {
    return this._minute;
  }
  public set Minute(value: number) {
    if (value >= 0) {
      this._minute = value;
      return;
    }
    throw new Error('Minute value cannot be negative.');
  }

  public get Second(): number {
    return this._second;
  }
  public set Second(value: number) {
    if (value >= 0) {
      this._second = value;
      return;
    }
    throw new Error('Second value cannot be negative.');
  }

  public get Millisecond(): number {
    return this._millisecond;
  }
  public set Millisecond(value: number) {
    if (value >= 0) {
      this._millisecond = value;
      return;
    }
    throw new Error('Millisecond value cannot be negative.');
  }

  constructor(hour = 0, minute = 0, second = 0, millisecond = 0) {
    this.Hour = hour;
    this.Minute = minute;
    this.Second = second;
    this.Millisecond = millisecond;
  }

  // TODO?: Add a summary
  public Ticks(): number {
    return (
      TimeSpan.FromHour(this.Hour) +
      TimeSpan.FromMinute(this.Minute) +
      TimeSpan.FromSecond(this.Second) +
      this.Millisecond
    );
  }

  // TODO?: Add a summary
  public SetToDate(date: Date): Date {
    date.setHours(this.Hour);
    date.setMinutes(this.Minute);
    date.setSeconds(this.Second);
    date.setMilliseconds(this.Millisecond);
    return date;
  }

  public static FromSecond(seconds: number): number {
    return seconds * 1000;
  }
  public static FromMinute(minutes: number): number {
    return minutes * 60 * 1000;
  }
  public static FromHour(hours: number): number {
    return hours * 60 * 60 * 1000;
  }
  public static FromDay(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }
  public static FromWeek(days: number): number {
    return days * 7 * 24 * 60 * 60 * 1000;
  }
}
