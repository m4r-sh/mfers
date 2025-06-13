import { test, expect } from 'bun:test'
import { findMfers, queryToFilter, filterToQuery } from '../src'

test('mfer query filtering', () => {

  expect(filterToQuery({
    background: ['red','orange'],
    'hat': ['none']
  })).toBe('bg.10-ht.0')

  expect(queryToFilter('bg.10-ht.0')).toEqual({
    background: ['red','orange'],
    'hat': ['none']
  })

  expect(queryToFilter('background.10-hat.0')).toEqual({
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

