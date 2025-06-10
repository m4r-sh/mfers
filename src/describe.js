export function describe(trait_obj){
  if(!trait_obj || typeof trait_obj != 'object'){ throw 'must pass mfer or trait object' }

  if(trait_obj.traits){ trait_obj = trait_obj.traits } // mfer shortcut
  
  let { 
    type, shirt, chain, ['4:20 watch']:  watch,
    beard, eyes, ['short hair']: short_hair,
    ['long hair']: long_hair, ['hat under headphones']: hat_under,
    ['hat over headphones']: hat_over,
    headphones, mouth, smoke
  } = trait_obj

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
          "headband blue/red": "blue and red striped headband",
          "beanie monochrome": "gray pinwheel hat"
        }[hat_under]
        if(!better_hat){ throw Error('hat under not found ' + hat_under) }
        return `wearing a ${better_hat} under their ${phrases.headphones()}`
      }
      if(hat_over && hat_over != 'hoodie'){
        if(hat_over == 'pilot helmet'){
          return 'light green pilot helmet with light blue goggles'
        }
        return `wearing a ${hat_over} over their ${phrases.headphones()}`
      }
      return `wearing ${phrases.headphones()}`
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
    '. ',
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