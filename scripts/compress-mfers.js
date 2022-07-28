import fs from 'fs'
import { traits_to_compress, uniques, padLeft, padRight } from '../utils/index.js'

const mfers_data = JSON.parse(fs.readFileSync('./data/mfers.json'))

/* 

the idea is to:
- compress each mfer's traits to a tiny string (base64)
- make one big string from all tiny strings (0-10020, in order)
- export the string for the source code to import as data
*/

// store the # of bits needed to encode each trait's variations (including "none")
let bit_frames = {}
Object.keys(traits_to_compress).forEach(trait_type => {
  bit_frames[trait_type] = (traits_to_compress[trait_type].length).toString(2).length
})

// sum all trait frame sizes
let bits_per_mfer = Object.values(bit_frames).reduce((s,v) => s + v, 0)

// do the work
let compressed_mfers = compress(mfers_data)

// save to importable js file for src/index.js
fs.writeFileSync('./src/b64-mfers.js',`export let bits_per_mfer = ${bits_per_mfer};
export let b64_mfers = \`${compressed_mfers}\`;`)



// convert array of mfer metadata to compressed base64 string
function compress(mfers){
  let bit_str = ""
  mfers.forEach(mfer => {
    let mfer_bits = ""
    Object.keys(traits_to_compress).forEach(trait_type  => {
      // index of variant (where 0 = none)
      let variant_index = traits_to_compress[trait_type].findIndex(v => v == mfer.traits[trait_type]) + 1
      // append bits encoding the variation index for this trait (pad to exactly fit frame size)
      mfer_bits += padLeft(variant_index.toString(2), bit_frames[trait_type])
    });
    bit_str += mfer_bits;
  })
  return binaryStringToBase64(bit_str)
}

function binaryStringToBase64(string) {
  // ensure binary is a multiple of 8
  string = padRight(string, Math.ceil(string.length / 8) * 8)

  const groups = string.match(/[01]{8}/g);
  const numbers = groups.map(binary => parseInt(binary, 2))

  let arr = new Uint8Array(numbers)

  return Buffer.from(arr.buffer).toString('base64');
}