export interface IERC20 {
resolver: IABIFuncCall<{node: bytes32},{0: address}>;
owner: IABIFuncCall<{node: bytes32},{0: address}>;
setSubnodeOwner: IABIFuncSend<{node: bytes32, label: bytes32, owner: address}>;
setTTL: IABIFuncSend<{node: bytes32, ttl: uint64}>;
ttl: IABIFuncCall<{node: bytes32},{0: uint64}>;
setResolver: IABIFuncSend<{node: bytes32, resolver: address}>;
setOwner: IABIFuncSend<{node: bytes32, owner: address}>;
}

export interface IERC20Connected {
resolver: ABIFuncCallConnected<{node: bytes32},{0: address}>;
owner: ABIFuncCallConnected<{node: bytes32},{0: address}>;
setSubnodeOwner: ABIFuncSendConnected<{node: bytes32, label: bytes32, owner: address}>;
setTTL: ABIFuncSendConnected<{node: bytes32, ttl: uint64}>;
ttl: ABIFuncCallConnected<{node: bytes32},{0: uint64}>;
setResolver: ABIFuncSendConnected<{node: bytes32, resolver: address}>;
setOwner: ABIFuncSendConnected<{node: bytes32, owner: address}>;
}


interface IABIFuncParamlessCall<T = void> {
  encodeArguments(): string;
  decodeArguments(str: string): any;
  decodeReturnValue(argStr: string): T;
}

interface IABIFuncCall<T, K = void> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
  decodeReturnValue(argStr: string): K;
}

interface IABIFuncParamlessSend {
  encodeArguments(): string;
  decodeArguments(str: string): any;
}

interface IABIFuncSend<T> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
}
type ABIFuncCallConnected<T, K = void> = (x: T, txObj?: ICallTxObj) => Promise<K>;
type ABIFuncParamlessCallConnected<T = void> = (txObj?: ICallTxObj) => Promise<T>;
type ABIFuncSendConnected<T> = (x: T, txObj?: ITransactionObj) => Promise<string>;
type ABIFuncParamlessSendConnected = (txObj?: ITransactionObj) => Promise<string>;

interface ITransactionObj {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
  nonce?: string;
}

interface ICallTxObj {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
}

type bytes32 = any;
type address = any;
type uint64 = any;
