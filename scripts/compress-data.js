import mfers_data from '../data/mfers.json'
import { traits, bit_frames, bits_per_mfer } from '../src/traits'

Bun.write(`./src/_data.js`, `export const mferdata = new Uint8Array([
  ${compress(mfers_data).join(',')}
])`)


// convert array of mfer metadata to compressed base64 string
function compress(mfers){
  let bit_str = ""
  mfers.forEach(mfer => {
    let mfer_bits = ""
    Object.keys(traits).forEach(trait_type  => {
      // index of variant (where 0 = none)
      let variant_index = traits[trait_type].findIndex(v => v == mfer.traits[trait_type]) + 1
      // append bits encoding the variation index for this trait (pad to exactly fit frame size)
      mfer_bits += padLeft(variant_index.toString(2), bit_frames[trait_type])
    });
    mfer_bits = padRight(mfer_bits, Math.ceil(bits_per_mfer / 8) * 8)
    console.log(mfer_bits)
    bit_str += mfer_bits;
  })
  return binaryStringToArr(bit_str)
}

function binaryStringToArr(string) {
  // ensure binary is a multiple of 8
  string = padRight(string, Math.ceil(string.length / 8) * 8)
  return new Uint8Array(string.match(/[01]{8}/g).map(binary => parseInt(binary, 2)))
}

function padLeft(str,ideal_length){
  return "0".repeat(ideal_length - str.length) + str
}

function padRight(str,ideal_length){
  return str + "0".repeat(ideal_length - str.length)
}