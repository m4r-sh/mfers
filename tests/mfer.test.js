import { test, expect } from 'bun:test'
import { mfers } from '../src'

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
})
