export const interfaces = `
interface ABIFuncCall<T, K = void> {
  (x: T): Promise<K>;
}
interface ABIFuncParamlessCall<T = void> {
  (): Promise<T>;
}
interface ABIFuncSend<T> {
  (x: T): Promise<string>;
}
interface ABIFuncParamlessSend {
  (): Promise<string>;
}
`;
