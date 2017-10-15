export interface IAuction {
resolver: ABIFuncCall<{address: bytes32},{resolverAddress: address}>
owner: ABIFuncCall<{owner: bytes32},{ownerAddress: address}>
setSubnodeOwner: ABIFuncSend<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFuncSend<{node: bytes32, ttl: uint64}>
ttl: ABIFuncCall<{timeToLive: bytes32},{timeToLive: uint64}>
setResolver: ABIFuncSend<{node: bytes32, resolver: address}>
setOwner: ABIFuncSend<{node: bytes32, owner: address}>
}
export interface IAuctionConnected {
resolver: ABIFuncCallConnected<{address: bytes32},{resolverAddress: address}>
owner: ABIFuncCallConnected<{owner: bytes32},{ownerAddress: address}>
setSubnodeOwner: ABIFuncSendConnected<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFuncSendConnected<{node: bytes32, ttl: uint64}>
ttl: ABIFuncCallConnected<{timeToLive: bytes32},{timeToLive: uint64}>
setResolver: ABIFuncSendConnected<{node: bytes32, resolver: address}>
setOwner: ABIFuncSendConnected<{node: bytes32, owner: address}>
}
export interface ISecondFile {
resolver: ABIFuncCall<{node: bytes32},{address_0: address}>
owner: ABIFuncCall<{node: bytes32},{address_0: address}>
setSubnodeOwner: ABIFuncSend<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFuncSend<{node: bytes32, ttl: uint64}>
ttl: ABIFuncCall<{node: bytes32},{uint64_0: uint64}>
setResolver: ABIFuncSend<{node: bytes32, resolver: address}>
setOwner: ABIFuncSend<{node: bytes32, owner: address}>
}
export interface ISecondFileConnected {
resolver: ABIFuncCallConnected<{node: bytes32},{address_0: address}>
owner: ABIFuncCallConnected<{node: bytes32},{address_0: address}>
setSubnodeOwner: ABIFuncSendConnected<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFuncSendConnected<{node: bytes32, ttl: uint64}>
ttl: ABIFuncCallConnected<{node: bytes32},{uint64_0: uint64}>
setResolver: ABIFuncSendConnected<{node: bytes32, resolver: address}>
setOwner: ABIFuncSendConnected<{node: bytes32, owner: address}>
}

interface ABIFuncParamlessCall<T = void> {
  encodeArguments(): string;
  decodeArguments(str: string): any;
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

type bytes32 = any
type address = any
type uint64 = any
