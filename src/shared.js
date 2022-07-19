import { b64_mfers, bits_per_mfer } from './b64-mfers.js'
import { traits_to_compress, uniques, padLeft, compressed_colors } from '../utils/index.js'

export let MFERS_CONTRACT = "0x79fcdef22feed20eddacbb2587640e45491b757f"

export let traits = { 
  ...traits_to_compress,
  "1/1": uniques.map(([_,traits]) => traits["1/1"])
}

let normal_trait_keys = Object.keys(traits_to_compress)

let color_map = compressed_colors.split('|').map(s => s.split(';').map(s => s.split(',').map(s => {
  if(!s || s.length == 0){
    s = '000000'
  } else if(s.length == 2){
    s = s + s + s
  } else if(s.length == 3){
    let [r,g,b]=s.split('')
    s = r + r + g + g + b + b
  }
  return '#'+s
})))

let trait_colors = {}
for(let i = 0; i < normal_trait_keys.length; i++){
  let trait_type = normal_trait_keys[i]
  let variants = traits_to_compress[trait_type]
  trait_colors[trait_type] = {}
  for(let j = 0; j < variants.length; j++){
    trait_colors[trait_type][variants[j]] = color_map[i][j]
  }
}
export let colors = trait_colors

// store the # of bits needed to encode each trait's variations (including "none")
let bit_frames = {}
normal_trait_keys.forEach(trait_type => {
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
    let mfer_colors = {}
    normal_trait_keys.forEach(trait_type => {
      let frame_size = bit_frames[trait_type]
      let variant_index = parseInt(mfer_bits.substr(cursor, frame_size),2) - 1
      if(variant_index >= 0){
        let variant = traits_to_compress[trait_type][variant_index]
        mfer.traits[trait_type] = variant
        trait_colors[trait_type][variant].forEach(c => {
          mfer_colors[c] = mfer_colors[c] ? mfer_colors[c]+1 : 1
        })
      }
      cursor += frame_size
    })
    mfer.colors = Object.keys(mfer_colors).sort((a,b) => mfer_colors[b] - mfer_colors[a])
    mfers.push(mfer)
  }
  uniques.forEach(([i,unique_traits]) => {
    mfers[i] = { i, traits: unique_traits, colors: ['#000000','#ffffff']}
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