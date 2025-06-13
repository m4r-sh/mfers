import { mferdata } from "./_data";
import { Mfer } from './Mfer'
import { uniques } from "./categories";

export { describe } from "./describe";
export { background_colors } from "./colors";
export { traits } from "./traits";
export { categories, categoryToTraits, traitToCategory } from "./categories";
export { queryToFilter, filterToQuery } from "./filter";
export { mfersToBuffer, traitsToB64, b64ToTraits } from "./encode";

const oneofones = Object.keys(uniques).map(n => parseInt(n))

let cached_mfers = null

function getMfers(){
  if(!cached_mfers){
    cached_mfers = initMfers()
  }
  return cached_mfers
}


function initMfers(){
  let buffer = mferdata()
  let arr = new Array(10021)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Mfer(buffer,i)
  }
  return arr
}


function findMfers(obj){
  return getMfers().filter(mfer => mfer.match(obj))
}

export { getMfers, findMfers, oneofones, uniques }