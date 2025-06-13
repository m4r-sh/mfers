import mfers_data from '../data/mfers.json'
import { categories, categoryToTraits, bit_frames, bits_per_mfer } from '../src/categories'

Bun.write(`./src/_data.js`, `export function mferdata(){ return new Uint8Array([
  ${compress(mfers_data).join(',')}
]) }`)

function getVariantCode(mfer,category){
  let traits = categoryToTraits(category)
  let variant = mfer.traits[traits.find(t => mfer.traits[t])]
  let index = categories[category].findIndex(v => v == variant)
  if(index == -1){
    index = 0
  }
  return index
}


// convert array of mfer metadata to compressed base64 string
function compress(mfers){
  let bit_str = ""
  mfers.forEach(mfer => {
    let mfer_bits = ""
    Object.keys(categories).forEach(category  => {
      let code = getVariantCode(mfer, category)
      // append bits encoding the variation index for this trait (pad to exactly fit frame size)
      mfer_bits += padLeft(code.toString(2), bit_frames[category])
    });
    mfer_bits = padRight(mfer_bits, Math.ceil(bits_per_mfer / 8) * 8)
    // console.log(mfer_bits)
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