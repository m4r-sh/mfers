import { mferdata } from "./_data";
import { Mfer } from './Mfer'

export { describe } from "./describe";
export { background_colors } from "./colors";
export { traits } from "./traits";
export { categories, categoryToTraits, traitToCategory, uniques } from "./categories";
export { queryToFilter, filterToQuery } from "./filter";
export { mfersToBuffer, traitsToB64, b64ToTraits } from "./encode";

const mfers = initMfers()

function initMfers(){
  let arr = new Array(10021)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Mfer(mferdata,i)
  }
  return arr
}


function findMfers(obj){
  return mfers.filter(mfer => mfer.match(obj))
}

export { mfers, findMfers }