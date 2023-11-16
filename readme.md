<div align="center">
  <img src="https://github.com/mfers-dev/mfers/raw/main/meta/social.png" alt="mfers" width="400" />
</div>

<h1 align="center">mfers</h1>
<div align="center">
  <a href="https://npmjs.org/package/mfers">
    <img src="https://badgen.now.sh/npm/v/mfers" alt="version" />
  </a>
  <a href="https://bundlephobia.com/result?p=mfers">
    <img src="https://img.badgesize.io/mfers-dev/mfers/main/dist/es.min.js?compression=brotli" alt="download size" />
  </a>
</div>

<div align="center">quick and easy access to <a href="https://opensea.io/collection/mfers">mfers</a> metadata</div>

<h3 align="center">
  <a href="#Overview"><b>Overview</b></a> | 
  <a href="#Install"><b>Install</b></a> | 
  <a href="#API"><b>API</b></a> | 
  <a href="#Why?"><b>Why</b></a>
</h3>

## Overview
- Access trait metadata for all mfers
- Metadata compressed from 7.5MB ~> 75kB
- Isomorphic: works on both NodeJS and browser

> Looking for JSON data files? Check [here](https://github.com/mfers-dev/mfers/tree/main/data)

## Install

Via [NPM](https://npmjs.com/package/mfers):
```sh
npm install mfers
```

**NodeJS**
```js
// ES6 Syntax
import { mfers, traits, MFERS_CONTRACT } from 'mfers';

// CJS syntax
const { mfers, traits, MFERS_CONTRACT } = require('mfers');
```

**Browser Module** (via [skypack](https://skypack.dev)):
```js
import { mfers, traits, MFERS_CONTRACT } from 'https://cdn.skypack.dev/mfers';
```

## API


### `mfers`

An ordered array of mfer metadata. Index in array = mfer token id (mfer #3664 ~> `mfer[3664]`)

Each mfer provides `traits`, `colors`, and `description`

```js
import { mfers } from 'mfers';

mfers[3664]
// {
//    i: 3664,
//    traits: {
//      "background": "blue",
//      "type": "plain mfer",
//      "eyes": "3D glasses",
//      "mouth": "smile",
//      "headphones": "gold headphones",
//      "hat over headphones": "hoodie",
//      "smoke": "cig white"
//    },
//    colors: [
//      '#000000', '#ffffff', '#353535', '#191919',
//      '#141414', '#e2aa46', '#c48d2e', '#e59f5f',
//      '#7dd0ff', '#313131', '#558aff', '#1350d8',
//      '#b90000', '#ff2222', '#fa3434'
//    ],
//    description: "a simple hand-drawn stick figure wearing
//      3D glasses with red and blue lenses with a soft smile
//      and smoking a cig. They have no hair, are wearing
//      gold headphones, and are wearing a dark gray hoodie
//      with the hood up over the headphones"
// }
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


### `colors`

An object containing an array of colors for each trait variant (not including 1/1's). Output array is sorted by number of pixels the color occupies in the layer.

```js
import { colors } from 'mfers';

colors['headphones']['pink headphones']
// ~> [ "#ff9295", "#000000", "#ff7174"]

colors['background']['graveyard']
// ~> [ "#7c7c7c", "#090908", "#a7a7a5", "#ffc954", "#686867"]

colors['eyes']['purple shades']
// ~> [ "#000000", "#952791", "#6b2768", "#f147eb"]
```

### `describe_traits(mfer_traits)`

A function that describes arbitrary trait combinations using plain english, ideal for LLMs and GPTs.
This was used for [MferGPT](https://x.com/m4rsh___/status/1723490110958702632)

### `MFERS_CONTRACT`

[Contract address](https://etherscan.io/token/0x79FCDEF22feeD20eDDacbB2587640e45491b757f) for mfers

```js
import { MFERS_CONTRACT } from 'mfers';
  
MFERS_CONTRACT
// ~> "0x79fcdef22feed20eddacbb2587640e45491b757f"
```


## Why?

mfers is an NFT collection that lives on the Ethereum blockchain with metadata stored on IPFS. Instead of manually downloading and parsing 10k JSON files, you can just import this library! The metadata is stored in a compressed format, reducing the network payload by 100x (7.5 MB ~> 75 kB)

### Use Case Inspiration

- Tailored media generators
  - (for example, [mfer heads](https://heads.mfers.dev/3664.png))
- mfer dapp theming (color schemes + trait-specific designs)
- Derivative projects
- Sniping aesthetic trait combinations


## Acknowledgements

mfers (by sartoshi) is a cc0 project, giving creators and developers the freedom to build things like this. Enjoy mfers ~

- [OG assets](https://drive.google.com/drive/folders/1VfCnmP4NBfDWH9htf_KKWJhNbUXhb2TV)
- [OpenSea](https://opensea.io/collection/mfers)
- [Unofficial discord](https://discord.gg/unofficialmfers)
- [Etherscan](https://etherscan.io/token/0x79FCDEF22feeD20eDDacbB2587640e45491b757f)