/* eslint-disable @typescript-eslint/ban-types */
export class HandlerDecorator {
  public static ErrorHandling(handler: ErrorHandler): MethodDecorator {
    return function (
      target: any,
      name: string,
      descriptor: TypedPropertyDescriptor<Function>
    ) {
      const original = descriptor.value;
      if (original === undefined || original === null) return descriptor;
      if (typeof original !== 'function') return descriptor;
      descriptor.value = function (...args: any) {
        try {
          return original.apply(this, args);
        } catch (error) {
          handler(error);
        }
      };

      return descriptor;
    };
  }
}

type ErrorHandler = (error: any) => void;
type MethodDecorator = (target: any, name: string, descriptor: any) => void;
