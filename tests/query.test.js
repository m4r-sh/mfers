import { test, expect } from 'bun:test'
import mfers_json from '../data/mfers.json'
import { findMfers, mfers, queryToFilter, filterToQuery } from '../src'

test('mfer query filtering', () => {

  expect(filterToQuery({
    background: ['red','orange'],
    'hat': ['none']
  })).toBe('bg.01-ht.0')

  expect(queryToFilter('bg.01-ht.0')).toEqual({
    background: ['red','orange'],
    'hat': ['none']
  })

  expect(queryToFilter('background.01-hat.0')).toEqual({
    background: ['red','orange'],
    'hat': ['none']
  })

  expect(filterToQuery({
    type: ['zombie mfer','alien mfer','ape mfer','1/1']
  })).toBe('mf.2435')
  
  expect(queryToFilter('mf.2543')).toEqual({
    type: ['zombie mfer','1/1','alien mfer','ape mfer']
  })
})

