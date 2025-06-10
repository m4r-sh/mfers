export let traits = {
  "background": [ 
    "red", "orange", "graveyard", "green", "yellow", "blue", "tree", "space"
  ],
  "type": [ 
    "plain mfer", "charcoal mfer", "zombie mfer", "ape mfer", "alien mfer"
  ],
  "shirt": [ 
    "collared shirt blue", "hoodie down gray", "collared shirt white", "hoodie down white", "collared shirt green", "hoodie down green", "hoodie down blue", "hoodie down pink", "collared shirt yellow", "hoodie down red", "collared shirt turquoise", "collared shirt pink"
  ],
  "chain": [ 
    "silver chain", "gold chain"
  ],
  "4:20 watch": [ 
    "sub red", "sub bat (blue/black)", "sub lantern (green)", "argo black", "oyster silver", "sub black", "sub blue", "oyster gold", "sub rose", "sub turquoise", "argo white", "sub cola (blue/red)"
  ],
  "beard": [ 
    "full beard"
  ],
  "eyes": [ 
    "regular eyes", "nerd glasses", "zombie eyes", "shades", "vr", "3D glasses", "purple shades", "eye mask", "alien eyes"
  ],
  "short hair": [ 
    "mohawk blue", "messy red", "mohawk pink", "mohawk green", "mohawk black", "messy yellow", "messy purple", "mohawk yellow", "messy black", "mohawk purple", "mohawk red"
  ],
  "long hair": [ 
    "long hair black", "long hair yellow"
  ],
  "hat under headphones": [ 
    "knit buffalo", "bandana dark gray", "headband green/white", "beanie", "knit dallas", "headband blue/white", "bandana red", "knit atlanta", "knit cleveland", "knit kc", "knit pittsburgh", "knit baltimore", "knit chicago", "cap monochrome", "knit san fran", "knit miami", "headband pink/white", "knit las vegas", "cap purple", "headband blue/green", "bandana blue", "knit new york", "headband blue/red", "beanie monochrome"
  ],
  "headphones": [ 
    "black headphones", "white headphones", "pink headphones", "gold headphones", "blue headphones", "green headphones", "red headphones", "lined headphones"
  ],
  "hat over headphones": [ 
    "cowboy hat", "top hat", "hoodie", "pilot helmet"
  ],
  "mouth": [ 
    "smile", "flat"
  ],
  "smoke": [ 
    "cig black", "cig white", "pipe"
  ]
}

export let bit_frames = Object.keys(traits).reduce((o,trait_type) => {
  o[trait_type] = (traits[trait_type].length).toString(2).length
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