import { mferdata } from "./_data";
import { Mfer } from './Mfer'
import { describe } from "./describe";
import { background_colors } from "./colors";
import { traits, uniques } from "./traits";

const mfers = initMfers()

function initMfers(){
  let arr = new Array(10021)
  for(let i = 0; i < arr.length; i++){
    arr[i] = new Mfer(mferdata,i)
  }
  return arr
}

export { mfers, describe, traits, background_colors }