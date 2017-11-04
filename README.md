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
typ3-cli -f ./auction.json -o ./auctionTypes.ts
```
Then to import the typed interface,
```ts
import { IAuction, IConnectedAuction } from './auctionTypes'
```

This will allow your code editor to auto generate the functions and properties from your ABI

### Features
An additional *filename*.output.ts file can be placed in the same folder as the ABI file to map names to unnamed output results from the ABI. The file should look like this:
```ts
// auction.output.ts
module.exports = {
    resolver: ["resolverAddress"],
    owner: ["ownerAddress"],
    ttl: ["timeToLive"]
};
```
where each key is the name of a function, and the value is the name to map to the result.

Multiple output files can be specified when there are multiple input files, to print each type definition to a specific file. Example usage:
```shell
typ3-cli -f ./testABIs/auction.json ./testABIs/ERC20.json -o ./auction.ts ./erc20.ts
```
