export let traits_to_compress = {
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

export let compressed_colors = `ff7c7c;ffba7a;7c,090908,a7a7a5,ffc954,686867;c7ff81;ffe375;7dd0ff;ffe375,,2e7d27;797a7a,,f2,2466fa,2ea930|ff,,31;85,99,81,;5a7c47,6f8f59,;735a44,70563f,bda88a,8b7764,c8b79e,;aae9f7,92d9e6,|,4c6aff,1d39c6;,35,19,14,2e;,ff,ba;,ff,04,af;,187f1d,056e0b;,001e00,16ad00,027000,060;,002,033cb9,001e78,00196e;,ff6969,aa3e3e,3b0606,9d3838;,f2cd43,d8b329;1e0000,,ad0000,700000,600;,48fffb,14cac5;,dd7878,d65959|090c16,df;,ffdc31|,f00,b1,ff,e7;,ff,006dff,d9;,00a50c,ff,d9;,c3,8a,100808;,d9,ff;,ff,d9,7a;,0071ff,ff,d9;,ffdc31,ff,fff075;,ff7979,ff,d9;,00fdd6,ff,d9;,cfd7d7,8a,ff;,ff,006dff,f00,d9||;,4c6ebf,11358e,6290ff;,48,24,ea2120;,25,ff;,8ad8ff;,ff,558aff,1350d8,b90000,f22,fa3434;,952791,6b2768,f147eb;;,3b8898|,0958e6;f00,;,ff6a6a;,01c200;;ffcb00,;b300ff,;,ffd315;;,9100ff;,f00|;ffd315,|00001d,1d24bd,bd1d1d;35,110d00,,46;,f1fff8,26d200;,3c5dfc,fff21c,f00,6eff3f;000013,292595,fb;,ff,425bed,3a51d7;c10000,110d00,,850505;,24,930000;,674939,f50;100000,b41c18,fac620;,27,ffb80c;,1f,580094;04061a,121966,f50;31,010405,,42;020000,762d2c,9a6e45;00171e,18b5c4,fc7a14;,ff,ff7f7f;,1e,657279;010203,9518e0,a532ea,6a1a99,9828db,af40f0,8d16d4;,01dd32,425bed,3a51d7;,1045ff,305fff,2b4ec9,07289b,416cff;000900,227a09,ff;,e00000,425bed,3a51d7;,47,8e|010102,1f1d16;ff,,e7;ff9295,,ff7174;e2aa46,,c48d2e,e59f5f;382fce,,2418e5;2c793f,,2f9549,187a30;e41818,;ff,,e7|562f1a,,391e0e;,f00;35,,19,14;80da65,,5fba43,7bb66a,8ee873,06c0d4,4feeff,3d6830,59bb3b|;|;,ff;`