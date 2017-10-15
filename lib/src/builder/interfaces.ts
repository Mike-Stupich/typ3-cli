export const interfaces = `
interface ABIFuncParamlessCall<T = void> {
  encodeArguments(): string;
  decodeArguments(str:string): any;
  decodeReturnValue(argStr: string): T;
}

interface ABIFuncCall<T, K = void> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
  decodeReturnValue(argStr: string): K;
}

interface ABIFuncParamlessSend {
  encodeArguments(): string;
  decodeArguments(str: string): any;
}

interface ABIFuncSend<T> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
}
interface ABIFuncCallConnected<T, K = void> {
  (x: T): Promise<K>;
}
interface ABIFuncParamlessCallConnected<T = void> {
  (): Promise<T>;
}
interface ABIFuncSendConnected<T> {
  (x: T): Promise<string>;
}
interface ABIFuncParamlessSendConnected {
  (): Promise<string>;
}
`;
