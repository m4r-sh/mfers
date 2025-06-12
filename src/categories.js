// 1. extract type from bg
// 2. add "none" value
// 3. add chain to clothes
// 4. combine hairs
// 5. remove headphones if pilot

let shortcuts = {
  'background': 'bg',
  'type': 'mf',
  'clothes': 'c',
  '4:20 watch': 'w',
  'beard': 'b',
  'eyes': 'e',
  'hair': 'hr',
  'hat': 'ht',
  'headphones': 'p',
  'mouth': 'm',
  'smoke': 's'
}

export function categoryToTraits(c){
  let traits = [c]
  if(c == 'hat'){
    traits = ['hat under headphones','hat over headphones']
  } else if(c == 'hair'){
    traits = ['short hair', 'long hair']
  } else if(c == 'clothes'){
    traits = ['shirt', 'chain']
  }
  return traits
}

export function traitToCategory(t){
  let c = t
  if(t == 'hat under headphones' || t == 'hat over headphones'){
    c = 'hat'
  }
  if(t == 'short hair' || t == 'long hair'){
    c = 'hair'
  }
  if(t == 'shirt' || t == 'chain'){
    c = 'clothes'
  }
  return c
}


function getVariantCode(mfer,category){
  let traits = [category]
  if(category == 'hat'){
    traits = ['hat under headphones','hat over headphones']
  } else if(category == 'hair'){
    traits = ['short hair', 'long hair']
  } else if(category == 'clothes'){
    traits = ['shirt', 'chain']
  }
  let variant = mfer.traits[traits.find(t => mfer.traits[t])]
  let index = categories[category].findIndex(v => v == variant)
  if(index == -1){
    index = 0
  }
  return index
}

export let categories = {
  "background": [ 
    "red", "orange", "graveyard", "green", "yellow", "blue", "tree", "space"
  ],
  "type": [ 
    "plain mfer", "charcoal mfer"
  ],
  "clothes": [ 
    void 0,"collared shirt blue", "hoodie down gray", "collared shirt white", "hoodie down white", "collared shirt green", "hoodie down green", "hoodie down blue", "hoodie down pink", "collared shirt yellow", "hoodie down red", "collared shirt turquoise", "collared shirt pink","silver chain", "gold chain"
  ],
  "4:20 watch": [ 
    void 0,"sub red", "sub bat (blue/black)", "sub lantern (green)", "argo black", "oyster silver", "sub black", "sub blue", "oyster gold", "sub rose", "sub turquoise", "argo white", "sub cola (blue/red)"
  ],
  "beard": [ 
    void 0,"full beard"
  ],
  "eyes": [ 
    "regular eyes", "nerd glasses", "zombie eyes", "shades", "vr", "3D glasses", "purple shades", "eye mask", "alien eyes"
  ],
  "hair": [ 
    void 0,"mohawk blue", "messy red", "mohawk pink", "mohawk green", "mohawk black", "messy yellow", "messy purple", "mohawk yellow", "messy black", "mohawk purple", "mohawk red", "long hair black", "long hair yellow"
  ],
  "hat": [ 
    void 0,"knit buffalo", "bandana dark gray", "headband green/white", "beanie", "knit dallas", "headband blue/white", "bandana red", "knit atlanta", "knit cleveland", "knit kc", "knit pittsburgh", "knit baltimore", "knit chicago", "cap monochrome", "knit san fran", "knit miami", "headband pink/white", "knit las vegas", "cap purple", "headband blue/green", "bandana blue", "knit new york", "headband blue/red", "beanie monochrome","cowboy hat", "top hat", "hoodie", "pilot helmet"
  ],
  "headphones": [ 
    "black headphones", "white headphones", "pink headphones", "gold headphones", "blue headphones", "green headphones", "red headphones", "lined headphones"
  ],
  "mouth": [ 
    "smile", "flat"
  ],
  "smoke": [ 
    void 0,"cig black", "cig white", "pipe"
  ]
}

export let bit_frames = Object.keys(categories).reduce((o,trait_type) => {
  o[trait_type] = (categories[trait_type].length - 1).toString(2).length
  return o
},{})

export let bits_per_mfer = Object.values(bit_frames).reduce((s,v) => s + v, 0)

export let uniques = {
  "140": "pop mfer",
  "781": "meeb mfer",
  "1825": "comic mfer",
  "2293": "loot'n mfer",
  "2506": "ring mfer",
  "3942": "glyph mfer",
  "4482": "beep mfer",
  "5476": "cool mfer",
  "5659": "nakamoto mfer",
  "5688": "punk mfer",
  "6551": "xmfer",
  "7456": "gang mfer",
  "7503": "gutter mfer",
  "8434": "squiggly mfer",
  "8618": "fidenz mfer",
  "9035": "noun mfer",
  "9205": "peaceful mfer",
  "9292": "cdb mfer",
  "9547": "bored mfer",
  "9860": "moon mfer",
  "9967": "toad mfer"
}