import { test, expect } from 'bun:test'
import { b64ToTraits, traitsToB64, mfers, uniques } from '../src'

test('b64 and back', () => {
  for(let i = 0; i < 10021; i++){
    if(!uniques[''+i]){
      expect(
        b64ToTraits(traitsToB64(mfers[i].traits))
      ).toEqual(mfers[i].traits)
    }
  }
})
