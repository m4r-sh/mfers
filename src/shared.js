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
    let mfer_bits = byte_str.substring(i * bits_per_mfer, bits_per_mfer + i*bits_per_mfer)
    let cursor = 0
    let mfer_colors = {}
    normal_trait_keys.forEach(trait_type => {
      let frame_size = bit_frames[trait_type]
      let variant_index = parseInt(mfer_bits.substring(cursor, frame_size + cursor),2) - 1
      if(variant_index >= 0){
        let variant = traits_to_compress[trait_type][variant_index]
        mfer.traits[trait_type] = variant
        trait_colors[trait_type][variant].forEach(c => {
          mfer_colors[c] = mfer_colors[c] ? mfer_colors[c]+1 : 1
        })
      }
      cursor += frame_size
    })
    mfer.description = describe_traits(mfer.traits)
    mfer.colors = Object.keys(mfer_colors).sort((a,b) => mfer_colors[b] - mfer_colors[a])
    mfers.push(mfer)
  }
  uniques.forEach(([i,unique_traits]) => {
    mfers[i] = { i, traits: unique_traits, colors: ['#000000','#ffffff']}
  })
  return mfers
}

function base64ToBinaryString(b64, decoder){
  let byte_arr = decoder(b64)
  let byte_str = ""
  byte_arr.forEach(n => {
    byte_str += padLeft((n).toString(2), 8)
  })
  return byte_str
}


export function describe_traits({ 
  type,
  shirt,
  chain,
  ['4:20 watch']:  watch,
  beard,
  eyes,
  ['short hair']: short_hair,
  ['long hair']: long_hair,
  ['hat under headphones']: hat_under,
  ['hat over headphones']: hat_over,
  headphones,
  mouth,
  smoke
}){

  let phrases = {
    smoke(){
      if(smoke == 'cig black' || smoke == 'cig white'){
        return ' and smoking a cig'
      } 
      if(smoke == 'pipe'){
        return ' and smoking a pipe'
      }
      return ''
    },
    beard(){
      if(beard){
        return ' full beard and a '
      }
      return ' '
    },
    mouth(){
      if(mouth == 'smile'){
        return `with a${phrases.beard()}soft smile${phrases.smoke()}`
      }
      if(mouth == 'flat'){
        return `with a${phrases.beard()}straight face${phrases.smoke()}`
      }
    },
    hair(){
      if(short_hair){
        let [hairstyle,color] = short_hair.split(' ')
        if(hairstyle == 'messy'){
          return `have ${color} short and messy hair`
        }
        if(hairstyle == 'mohawk'){
          return `have a ${color} mohawk hairstyle`
        }
      }
      if(long_hair){
        if(long_hair == 'long hair black'){
          return `have long, mid-back length black hair`
        }
        if(long_hair == 'long hair yellow'){
          return `have long, mid-back length blonde hair`
        }
      }
      return `have no hair`
    },
    headphones(){
      return headphones
    },
    hat(){
      if(hat_under){
        let better_hat = {
          "knit buffalo": "blue and red (buffalo) knit beanie",
          "bandana dark gray": "dark gray bandana worn as a durag",
          "headband green/white": "green and white striped headband",
          "beanie": "rainbow pinwheel hat",
          "knit dallas": "blue and white (dallas) knit beanie",
          "headband blue/white": "blue and white striped headband",
          "bandana red": "red bandana worn as a durag",
          "knit atlanta": "gray and red (atlanta) knit beanie",
          "knit cleveland": "brown and orange (cleveland) knit beanie",
          "knit kc": "red and yellow (kc) knit beanie",
          "knit pittsburgh": "gray and yellow (pittsburgh) knit beanie",
          "knit baltimore": "gray and purple (baltimore) knit beanie",
          "knit chicago": "navy and orange (chicago) knit beanie",
          "cap monochrome": "dark gray snapback hat",
          "knit san fran": "maroon and tan (san fran) knit beanie",
          "knit miami": "teal and orange (miami) knit beanie",
          "headband pink/white": "pink and white striped headband",
          "knit las vegas": "dark gray and light gray (las vegas) knit beanie",
          "cap purple": "bright purple snapback hat",
          "headband blue/green": "blue and green striped headband",
          "bandana blue": "blue bandana worn as a durag",
          "knit new york": "green and white (new york) knit beanie",
          "headband blue/red": "blue and red h stripedeadband",
          "beanie monochrome": "gray pinwheel hat"
        }[hat_under]
        if(!better_hat){ throw Error('hat under not found ' + hat_under) }
        return `are wearing a ${better_hat} under their ${phrases.headphones()}`
      }
      if(hat_over && hat_over != 'hoodie'){
        if(hat_over == 'pilot helmet'){
          return 'light green pilot helmet with light blue goggles'
        }
        return `are wearing a ${hat_over} over their ${phrases.headphones()}`
      }
      return `are wearing ${phrases.headphones()}`
    },
    shading(){
      if(type == 'alien mfer'){
        return '(an alien: face shaded light blue)'
      }
      if(type == 'zombie mfer'){
        return '(a zombie: face shaded light green)'
      }
      if(type == 'ape mfer'){
        return '(face shaded light brown)'
      }
      if(type == 'charcoal mfer'){
        return '(face shaded gray)'
      }
    },
    eyes(){
      let eye_desc = {
        // "regular eyes": "with tiny black dots for eyes",
        "nerd glasses": "wearing glasses with tinted blue lenses",
        "zombie eyes": "with bloodshot and tired eyes",
        "shades": "wearing black sunglasses",
        "vr": "wearing a vr headset with a bright cyan case",
        "3D glasses": "wearing 3D glasses with red and blue lenses",
        "purple shades": "wearing bright purple tinted sunglasses",
        "eye mask": "wearing an eye mask",
        "alien eyes": "with square eyes made of smaller blue squares that look like glowing screens"
      }
      return eye_desc[eyes]
    },
    clothes(){
      let wearing = []
      if(shirt){
        let [type,_,color] = shirt.split(' ')
        if(type == 'collared'){
          wearing.push(`a ${color} collared shirt`)
        }
        if(type == 'hoodie'){
          wearing.push(`a ${color} hoodie with the hood hanging down on their shoulders`)
        }
      }
      if(hat_over == 'hoodie'){
        wearing.push(`a dark gray hoodie with the hood up over the headphones`)
      }
      if(chain){
        wearing.push(`a ${chain}`)
      }
      if(watch){
        let watch_colors = {
          "sub red": 'red',
          "sub bat (blue/black)": 'blue and black',
          "sub lantern (green)": 'green',
          "argo black": 'black',
          "oyster silver": 'silver',
          "sub black": 'black',
          "sub blue": 'blue',
          "oyster gold": 'gold',
          "sub rose": 'pink',
          "sub turquoise": 'turquoise',
          "argo white": 'white',
          "sub cola (blue/red)": 'blue and red'
        }
        wearing.push(`a ${watch_colors[watch]} watch`)
      }
      if(wearing.length >= 1){
        return `are wearing ${combine(wearing)}`
      }
    }
  }

  return [
    'a simple hand-drawn stick figure',
    phrases.shading(),
    phrases.eyes(),
    phrases.mouth(),
    '. They',
    combine([
      phrases.hair(),
      phrases.hat(),
      phrases.clothes()
    ])
  ].filter(s => s && s.length > 0).join(' ').replaceAll(' .','.')
}

function combine(arr){
  arr = arr.filter(s => s && s.length)
  if(arr.length == 1) return arr[0]
  if(arr.length == 2) return arr.join(" and ")
  else return arr.slice(0,arr.length-1).join(', ') + ', and ' + arr[arr.length-1]
}