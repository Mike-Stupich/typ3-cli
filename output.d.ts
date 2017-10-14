export default interface auction {
resolver: ABIFunc<{node: bytes32},{address_0: address}>
owner: ABIFunc<{node: bytes32},{address_0: address}>
setSubnodeOwner: ABIFunc<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFunc<{node: bytes32, ttl: uint64}>
ttl: ABIFunc<{node: bytes32},{uint64_0: uint64}>
setResolver: ABIFunc<{node: bytes32, resolver: address}>
setOwner: ABIFunc<{node: bytes32, owner: address}>
}
export default interface secondFile {
resolver: ABIFunc<{node: bytes32},{address_0: address}>
owner: ABIFunc<{node: bytes32},{address_0: address}>
setSubnodeOwner: ABIFunc<{node: bytes32, label: bytes32, owner: address}>
setTTL: ABIFunc<{node: bytes32, ttl: uint64}>
ttl: ABIFunc<{node: bytes32},{uint64_0: uint64}>
setResolver: ABIFunc<{node: bytes32, resolver: address}>
setOwner: ABIFunc<{node: bytes32, owner: address}>
}

interface ABIFunc<T, K = void> {
  call(x: T): string;
  encodeOutput(x: T): string;
  decodeOutput(argStr: string): K;
}
interface ABIFuncParamless<T = void> {
  call(): string;
  encodeOutput(): string;
  decodeOutput(argStr: string): T;
}

type bytes32 = string
type address = string
type uint64 = string
