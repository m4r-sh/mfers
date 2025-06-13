import { test, expect } from 'bun:test'
import { mfers, oneofones } from '../src'

test('mfer 0 API test', () => {
  expect([...mfers[0]]).toEqual([
    [ "background", "red" ],
    [ "type", "plain mfer" ],
    [ "eyes", "regular eyes" ],
    [ "hat under headphones", "knit buffalo" ],
    [ "headphones", "black headphones" ],
    [ "mouth", "smile" ],
    [ "smoke", "cig black" ]
  ])
  expect(mfers[0].id).toBe(0)
  expect(mfers[0].toString()).toBe('[Mfer 0]')
  expect(JSON.stringify(mfers[0])).toBe('{"id":0,"traits":{"background":"red","type":"plain mfer","eyes":"regular eyes","hat under headphones":"knit buffalo","headphones":"black headphones","mouth":"smile","smoke":"cig black"}}')

  expect(oneofones).toEqual([140,781,1825,2293,2506,3942,4482,5476,5659,5688,6551,7456,7503,8434,8618,9035,9205,9292,9547,9860,9967])

})
