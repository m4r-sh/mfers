import fs from 'fs'
import { mfers, colors } from '../src/node.js'
import { dequal } from 'dequal'

const mfers_data = JSON.parse(fs.readFileSync('./data/mfers.json'))

// output of compression doesn't include image links
const trimmed_input = mfers_data.map(({ traits, i }) => ({ traits, i }) )

console.log(
  dequal(trimmed_input, mfers.map(({ traits, i}) => ({ traits, i })))
  ? "mfers passed the test!"
  : "mfers failed the test :("
)


// let trimmed_mfers = mfers.map(({ traits, i}) => ({ traits, i }))

// console.log(trimmed_mfers[10000])
// console.log(trimmed_input[10000])


// trimmed_input.forEach((og,i) => {
//   let mfer = trimmed_mfers[i]
//   if(!dequal(og,mfer)){
//     console.log(i)
//   }
// });