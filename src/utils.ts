/**
 * This working like Task.Delay() on the C#
 * @param ms
 * @returns
 * @example `
 *  doSomething...
 *  wait(1000) // One second
 *  continue...
 *  `
 */
 export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  
  export const uuidv4 = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  