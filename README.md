# typ3-cli
Command line tool to create a TypeScript strictly typed interface from an Ethereum ABI. This is a a developer tool for [typ3](https://github.com/Mike-Stupich/typ3) to allow for type inferencing.

### Installation
To install typ3-cli use `npm install -g typ3-cli`

### How to use
To use this development tool, compile an Ethereum contract into an ABI, then call
`typ3-cli -f ./path/to/file -o ./output/file` to generate the typed interface file. The interface in this file can then be imported to provide type-inferencing.

### Example usage
```shell
typ3-cli -f ./dist/auction.json
```
 or with optional -o
```shell
typ3-cli -f ./dist/auction.json -o ./abiTypes.ts
```
Then to import the typed interface,
```ts
import { IAuction, IConnectedAuction } from './abiTypes'
```

This will allow your code editor to auto generate the functions and properties from your ABI
