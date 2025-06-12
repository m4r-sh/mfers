import { categories, categoryToTraits, bit_frames, bits_per_mfer } from './categories'
import { Mfer } from './Mfer'


export function mfersToBuffer(mfers){
  let bitstr = ""
  mfers.forEach(mfer => {
    bitstr += traitsToBitstring(mfer.traits)
  })
  return binaryStringToArr(bitstr)
}

export function traitsToB64(traits){
  let bitstr = traitsToBitstring(traits)
  let view = binaryStringToArr(bitstr)
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(view).toString('base64').slice(0, 6); // drop ==
  }
  // Web standard path (btoa)
  let bin = '';
  for (let i = 0; i < 4; i++) bin += String.fromCharCode(view[i]);
  return btoa(bin).slice(0, 6);     
}

export function b64ToTraits(base64){
  // Re-attach == padding for a normal decoder
  const padded = base64.length === 6 ? base64 + '==' : base64;
  let arr = null
  if (typeof Buffer !== 'undefined') {
    arr = new Uint8Array(Buffer.from(padded, 'base64')); // 4 bytes
  } else {
    const bin = atob(padded);
    arr = new Uint8Array(4);
    for (let i = 0; i < 4; i++){
      arr[i] = bin.charCodeAt(i);
    }
  }
  let mf = new Mfer(arr,0)
  return mf.traits
  
}

function getVariantCode(traits,category){
  let trait_types = categoryToTraits(category)
  let variant = traits[trait_types.find(t => traits[t])]
  let index = categories[category].findIndex(v => v == variant)
  if(index == -1){
    index = 0
  }
  return index
}

export function traitsToBitstring(traits){
    let mfer_bits = ""
    Object.keys(categories).forEach(category  => {
      let code = getVariantCode(traits, category)
      // append bits encoding the variation index for this trait (pad to exactly fit frame size)
      mfer_bits += padLeft(code.toString(2), bit_frames[category])
    });
    mfer_bits = padRight(mfer_bits, Math.ceil(bits_per_mfer / 8) * 8)
    return mfer_bits
}

function padLeft(str,ideal_length){
  return "0".repeat(ideal_length - str.length) + str
}

function padRight(str,ideal_length){
  return str + "0".repeat(ideal_length - str.length)
}

function binaryStringToArr(string) {
  // ensure binary is a multiple of 8
  string = padRight(string, Math.ceil(string.length / 8) * 8)
  return new Uint8Array(string.match(/[01]{8}/g).map(binary => parseInt(binary, 2)))
}