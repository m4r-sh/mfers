<div align="center">
  <img src="https://github.com/m4r-sh/mfers/raw/main/meta/social.png" alt="mfers" width="400" />
</div>

<h1 align="center">mfers</h1>
<div align="center">
  <a href="https://npmjs.org/package/mfers">
    <img src="https://badgen.net/npm/v/mfers" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=mfers">
    <img src="https://badgen.net/bundlephobia/minzip/mfers" alt="download size" />
  </a>
</div>

<div align="center">quick and easy access to <a href="https://opensea.io/collection/mfers">mfers</a> metadata</div>

---

> Looking for JSON data files? Check [here](https://github.com/m4r-sh/mfers/tree/main/data)

## Install

Via [Bun](https://bun.sh/):
```sh
bun install mfers
```

```js
import { getMfers, findMfers, describe } from 'mfers';
```


## API


### `getMfers()`

returns an ordered array of mfer metadata. Index in array = mfer token id (mfer #6308 ~> `mfers[6308]`)

```js
import { getMfers } from 'mfers';

let mfers = getMfers()
mfers[6308].id // ~> 6308
mfers[6308].traits
// {
//   background: "blue",
//   type: "plain mfer",
//   eyes: "regular eyes",
//   "hat under headphones": "bandana dark gray",
//   headphones: "black headphones",
//   mouth: "flat",
//   smoke: "cig white",
// }

// shortcut to iterate over traits
for(let [trait,variant] of mfers[6308]){
  console.log({ trait, variant })
}

```

### `traits`

An object containing all possible variations for each trait

```js
import { traits } from 'mfers';

Object.keys(traits)
// ~> [ "chain", "hat over headphones", "short hair", ... ]

traits['chain']
// ~> [ "silver chain", "gold chain" ]

traits['hat over headphones']
// ~> [ "cowboy hat", "top hat", "hoodie", "pilot helmet" ]
```

### `describe(trait_obj)`

A function that describes arbitrary trait combinations using plain english, ideal for LLMs and GPTs.
This was used for [MferGPT](https://x.com/m4rsh/status/1723490110958702632)


## Why?

mfers is an NFT collection that lives on the Ethereum blockchain with metadata stored on IPFS. Instead of manually downloading and parsing 10k JSON files, you can just import this library! The metadata is stored in a compressed format, reducing the network payload by 100x

### Use Case Inspiration

- Tailored media generators
- mfer dapp theming (color schemes + trait-specific designs)
- Derivative projects
- Sniping aesthetic trait combinations

## Acknowledgements

mfers (by sartoshi) is a cc0 project, giving creators and developers the freedom to build things like this. Enjoy mfers ~

- [OG assets](https://drive.google.com/drive/folders/1VfCnmP4NBfDWH9htf_KKWJhNbUXhb2TV)
- [OpenSea](https://opensea.io/collection/mfers)
- [Unofficial discord](https://discord.gg/unofficialmfers)
- [Etherscan](https://etherscan.io/token/0x79FCDEF22feeD20eDDacbB2587640e45491b757f)