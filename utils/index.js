export let traits_to_compress = {
  "chain": [ 
    "silver chain", "gold chain"
  ],
  "hat over headphones": [ 
    "cowboy hat", "top hat", "hoodie", "pilot helmet"
  ],
  "short hair": [ 
    "mohawk blue", "messy red", "mohawk pink", "mohawk green", "mohawk black", "messy yellow", "messy purple", "mohawk yellow", "messy black", "mohawk purple", "mohawk red"
  ],
  "beard": [ 
    "full beard"
  ],
  "long hair": [ 
    "long hair black", "long hair yellow"
  ],
  "4:20 watch": [ 
    "sub red", "sub bat (blue/black)", "sub lantern (green)", "argo black", "oyster silver", "sub black", "sub blue", "oyster gold", "sub rose", "sub turquoise", "argo white", "sub cola (blue/red)"
  ],
  "shirt": [ 
    "collared shirt blue", "hoodie down gray", "collared shirt white", "hoodie down white", "collared shirt green", "hoodie down green", "hoodie down blue", "hoodie down pink", "collared shirt yellow", "hoodie down red", "collared shirt turquoise", "collared shirt pink"
  ],
  "hat under headphones": [ 
    "knit buffalo", "bandana dark gray", "headband green/white", "beanie", "knit dallas", "headband blue/white", "bandana red", "knit atlanta", "knit cleveland", "knit kc", "knit pittsburgh", "knit baltimore", "knit chicago", "cap monochrome", "knit san fran", "knit miami", "headband pink/white", "knit las vegas", "cap purple", "headband blue/green", "bandana blue", "knit new york", "headband blue/red", "beanie monochrome"
  ],
  "smoke": [ 
    "cig black", "cig white", "pipe"
  ],
  "headphones": [ 
    "black headphones", "white headphones", "pink headphones", "gold headphones", "blue headphones", "green headphones", "red headphones", "lined headphones"
  ],
  "background": [ 
    "red", "orange", "graveyard", "green", "yellow", "blue", "tree", "space"
  ],
  "type": [ 
    "plain mfer", "charcoal mfer", "zombie mfer", "ape mfer", "alien mfer"
  ],
  "eyes": [ 
    "regular eyes", "nerd glasses", "zombie eyes", "shades", "vr", "3D glasses", "purple shades", "eye mask", "alien eyes"
  ],
  "mouth": [ 
    "smile", "flat"
  ]
}

export let uniques = [
  [140, {"1/1": "pop mfer"}],
  [781, {"1/1": "meeb mfer"}],
  [1825, {"1/1": "comic mfer"}],
  [2293, {"1/1": "loot'n mfer"}],
  [2506, {"1/1": "ring mfer"}],
  [3942, {"1/1": "glyph mfer"}],
  [4482, {"1/1": "beep mfer"}],
  [5476, {"1/1": "cool mfer"}],
  [5659, {"1/1": "nakamoto mfer"}],
  [5688, {"1/1": "punk mfer"}],
  [6551, {"1/1": "xmfer"}],
  [7456, {"1/1": "gang mfer"}],
  [7503, {"1/1": "gutter mfer"}],
  [8434, {"1/1": "squiggly mfer"}],
  [8618, {"1/1": "fidenz mfer"}],
  [9035, {"1/1": "noun mfer"}],
  [9205, {"1/1": "peaceful mfer"}],
  [9292, {"1/1": "cdb mfer"}],
  [9547, {"1/1": "bored mfer"}],
  [9860, {"1/1": "moon mfer"}],
  [9967, {"1/1": "toad mfer"}],
]

export function padLeft(str,ideal_length){
  return "0".repeat(ideal_length - str.length) + str
}

export function padRight(str,ideal_length){
  return str + "0".repeat(ideal_length - str.length)
}