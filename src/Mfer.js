import { traits } from "./traits"
import { uniques, categories, bit_frames, bits_per_mfer, categoryToTraits } from "./categories"

const bytes_per_mfer = Math.ceil(bits_per_mfer / 8)
const category_keys = Object.keys(categories)
const trait_keys = Object.keys(traits)

export function Mfer(buffer, id) {
  Object.defineProperties(this, {
    buffer : { value: buffer, enumerable: false },   // hidden in enumeration
    id     : { value: id,     enumerable: true },
    _t     : { value: null,   writable: true, enumerable: false } // trait cache
  });
}

// ─── prototype (shared by all mfers) ──────────────────────────────────────────
Object.defineProperties(Mfer.prototype, {

  /* Uint8Array slice for this mfer */
  bytes: {
    get() {
      const off = this.id * bytes_per_mfer;
      return this.buffer.subarray(off, off + bytes_per_mfer);
    },
    enumerable: false
  },
  
  /* decoded traits (lazy-memoised) */
  traits: {
    get() {
      if (this._t) return this._t;

      let cursor = 0, out = {};
      for (const t of category_keys) {
        const bits = bit_frames[t];
        const v = categories[t][extractBits(this.bytes, cursor, bits)];
        if (v) out[t] = v;
        cursor += bits;
      }
      if(out.background == 'graveyard'){ out.type = 'zombie mfer' }
      if(out.background == 'tree'){ out.type = 'ape mfer' }
      if(out.background == 'space'){ out.type = 'alien mfer' }
      if(out.hair){
        let is_long = out.hair.includes('long')
        out[is_long ? 'long hair' : 'short hair'] = out.hair
        delete out.hair
      }
      if(out.hat){
        let is_over = ['cowboy hat', 'top hat', 'hoodie', 'pilot helmet'].includes(out.hat)
        if(out.hat == 'pilot helmet'){
          delete out.headphones
        }
        out[is_over ? 'hat over headphones' : 'hat under headphones'] = out.hat
        delete out.hat
      }
      if(out.clothes && out.clothes.includes('chain')){
        out.chain = out.clothes
        delete out.clothes
      }
      if(out.clothes){
        let is_chain = out.clothes.includes('chain')
        out[is_chain ? 'chain' : 'shirt'] = out.clothes
        delete out.clothes
      }
      let ordererd = trait_keys.reduce((o,t) => {
        if(out[t]){ o[t] = out[t] }
        return o
      },{})
      const uniq = uniques[this.id + ''];
      return this._t = uniq ? { '1/1': uniq } : ordererd;
    },
    enumerable: true
  },


  match: {
    value(obj={}){
      let cursor = 0, out = {};
      if(this.traits['1/1']){
        return obj.type && obj.type.includes('1/1') && Object.keys(obj).length == 1
      }
      for (const c in obj) {
        let ts = categoryToTraits(c)
        let variant = this.traits[ts.find(t => this.traits[t])] || 'none'
        // if(!variant){ return false }
        if(!obj[c].includes(variant)){ return false }
      }
      return true
    },
    enumerable: false
  },

  /* iterate over `[key,value]` pairs with `for … of` */
  [Symbol.iterator]: {
    value: function* () { yield* Object.entries(this.traits); },
    enumerable: false
  },

  /* nice JSON stringify */
  toJSON: {
    value() { return { id: this.id, traits: this.traits } },
    enumerable: false
  },

  toString: {
    value(){ return `[Mfer ${this.id}]`},
    enumerable: false
  }
  
});

// export class Mfer {
//   constructor(buffer,id){
//     this.buffer = buffer
//     this.id = id
//   }
//   get bytes(){
//     let { buffer, id } = this
//     let offset = id * bytes_per_mfer
//     return buffer.subarray(offset, offset + bytes_per_mfer)
//   }
//   get traits(){
//     let ans = {}
//     let cursor = 0
//     trait_keys.forEach(trait_type => {
//       let frame_size = bit_frames[trait_type]
//       let variant_index = extractBits(this.bytes,cursor,frame_size) - 1
//       if(variant_index >= 0){
//         ans[trait_type] = traits[trait_type][variant_index]
//       }
//       cursor += frame_size
//     })
//     let is_unique = uniques[''+this.id]
//     if(is_unique){ return { "1/1": is_unique } }
//     return ans
//   }
// }

function extractBits(bytes, bitOffset, bitLength) {
  let value = 0;

  for (let i = 0; i < bitLength; i++) {
    const absoluteBit = bitOffset + i;
    const byteIndex = absoluteBit >> 3;
    const bitIndex = 7 - (absoluteBit & 0b111);
    const bit = (bytes[byteIndex] >> bitIndex) & 1;
    value = (value << 1) | bit;
  }

  return value;
}