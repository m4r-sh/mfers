import { expanded_categories } from "./categories"

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

export function queryToFilter(q=''){
  let obj = {}
  if(q.length == 0){ return obj }
  q.split('-').forEach(x => {
    let [short='', num_string=''] = x.split('.')
    if(short && num_string && short.length > 0 && num_string.length > 0){
    let res = Object.entries(shortcuts).find(([k,v]) => v == short || k == short)
    if(res){
      let c = res[0]
      let nums = num_string.split('').map(n => decodeChar(n))
      obj[c] = nums.map(n => expanded_categories[c][n] || 'none')
    }
    }
  })
  return obj
}

export function filterToQuery(fil){
  let obj = {}
  Object.entries(fil).forEach(([c,arr]) => {
    obj[c] = arr.map(variant => encodeChar(
      expanded_categories[c].findIndex(v =>
      v == variant || (variant == 'none' && v == void 0)
      )
    ))
  })
  return Object.entries(obj).map(([k,a]) => `${shortcuts[k]}.${a.join('')}`).join('-')
}

function decodeChar(c) {
  return c >= 'A' ? c.charCodeAt(0) - 55 : parseInt(c, 10);
}

function encodeChar(n) {
  if (n >= 0 && n <= 9) return n.toString();
  if (n >= 10 && n <= 29) return String.fromCharCode(n + 55);
  throw new RangeError("Value out of range (0–29)");
}