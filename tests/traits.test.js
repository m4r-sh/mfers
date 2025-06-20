import { test, expect } from 'bun:test'
import mfers_json from '../data/mfers.json'
import { getMfers } from '../src'

let mfers = getMfers()
test('mfers traits match expected input', () => {
  expect(mfers_json.map(({ traits, i }) => traits ))
    .toEqual(mfers.map(mf => mf.traits))
})
