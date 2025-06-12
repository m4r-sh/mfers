import { mferdata } from "./_data";
import { Mfer } from './Mfer'
import { describe } from "./describe";
import { background_colors } from "./colors";
import { traits } from "./traits";
import { categories, categoryToTraits, traitToCategory, uniques } from "./categories";
import { queryToFilter, filterToQuery } from "./filter";

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

export { mfers, describe, traits, background_colors, uniques, categories, findMfers, queryToFilter, filterToQuery }