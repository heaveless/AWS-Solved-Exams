export type ClassConstructor = new (...args: any[]) => any;

export type Handler = (...args: any[]) => Promise<unknown> | unknown;

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
