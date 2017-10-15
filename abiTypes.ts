export interface IErc {
  approve: ABIFuncSend<{ spender: address; value: uint256 }>;
  totalSupply: ABIFuncParamlessCall<{ uint256_0: uint256 }>;
  transferFrom: ABIFuncSend<{ from: address; to: address; value: uint256 }>;
  balanceOf: ABIFuncCall<{ who: address }, { uint256_0: uint256 }>;
  transfer: ABIFuncSend<{ to: address; value: uint256 }>;
  approveAndCall: ABIFuncSend<{
    spender: address;
    value: uint256;
    extraData: bytes;
  }>;
  allowance: ABIFuncCall<
    { owner: address; spender: address },
    { uint256_0: uint256 }
  >;
}

type ABIFuncCall<T, K = void> = (x: T) => Promise<K>;

type ABIFuncParamlessCall<T = void> = () => Promise<T>;
type ABIFuncSend<T> = (x: T) => Promise<string>;
type ABIFuncParamlessSend = () => Promise<string>;

type address = any;
type uint256 = any;
type bool = boolean;
type bytes = any;
