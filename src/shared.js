import { b64_mfers, bits_per_mfer } from './b64-mfers.js'
import { traits_to_compress, uniques, padLeft } from '../utils/index.js'

export let MFERS_CONTRACT = "0x79fcdef22feed20eddacbb2587640e45491b757f"

export let traits = { 
  ...traits_to_compress,
  "1/1": uniques.map(([_,traits]) => traits["1/1"])
}

// store the # of bits needed to encode each trait's variations (including "none")
let bit_frames = {}
Object.keys(traits_to_compress).forEach(trait_type => {
  bit_frames[trait_type] = (traits_to_compress[trait_type].length).toString(2).length
})

// convert base64 string into array of mfer metadata
export function expand(decoder){
  let byte_str = base64ToBinaryString(b64_mfers, decoder)
  let mfers = []
  for(let i = 0; i < 10021; i++){
    let mfer = { i, traits: {} }
    let mfer_bits = byte_str.substr(i * bits_per_mfer, bits_per_mfer)
    let cursor = 0
    Object.keys(traits_to_compress).forEach(trait_type => {
      let frame_size = bit_frames[trait_type]
      let variant_index = parseInt(mfer_bits.substr(cursor, frame_size),2) - 1
      if(variant_index >= 0){
        mfer.traits[trait_type] = traits_to_compress[trait_type][variant_index]
      }
      cursor += frame_size
    })
    mfers.push(mfer)
  }
  uniques.forEach(([i,unique_traits]) => {
    mfers[i] = { i, traits: unique_traits}
  })
  return mfers
}

function base64ToBinaryString(b64, decoder){
  let byte_arr = Uint8Array.from(decoder(b64))
  let byte_str = ""
  byte_arr.forEach(n => {
    byte_str += padLeft((n).toString(2), 8)
  })
  return byte_str
}
