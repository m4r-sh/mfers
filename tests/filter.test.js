import { test, expect } from 'bun:test'
import mfers_json from '../data/mfers.json'
import { findMfers, mfers } from '../src'

test('mfer filter matching', () => {
  expect(mfers.filter(mfer => mfer.match({
    background: ['red','orange'],
    'hat': ['none']
  })).length).toBe(2544)


  expect(mfers.filter(mfer => mfer.match({
    background: ['tree','space']
  })).length).toBe(37)

  expect(findMfers({
    background: ['tree','space','blue'],
    headphones: ['black headphones']
  }).length).toBe(862)

  expect(mfers.filter(mfer => mfer.match({
    background: ['tree','space','blue'],
    headphones: ['black headphones']
  })).length).toBe(862)
  

  expect(mfers.filter(mfer => mfer.match({
    background: ['yellow'],
    hat: ['pilot helmet']
  })).length).toBe(7)

  expect(mfers.filter(mfer => mfer.match({
    background: ['yellow'],
    hair: ['long hair black']
  })).length).toBe(412)

  expect(mfers.filter(mfer => mfer.match({
    background: ['yellow'],
    hair: ['long hair yellow']
  })).length).toBe(0)

  expect(mfers.filter(mfer => mfer.match({
    "4:20 watch": ['argo black','none'],
  })).length).toBe(2690)
  
  expect(mfers.filter(mfer => mfer.match({
    "clothes": ['gold chain','silver chain'],
  })).length).toBe(490)

  expect(mfers.filter(mfer => mfer.match({
    "eyes": ['zombie eyes'],
  })).length).toBe(89)
  
  expect(mfers.filter(mfer => mfer.match({
    "beard": ['none'],
  })).length).toBe(8964)
  
  expect(mfers.filter(mfer => mfer.match({
    "beard": ['full beard','none'],
  })).length).toBe(10_000)
  

  expect(mfers.filter(mfer => mfer.match({
    type: ['1/1']
  })).length).toBe(21)

})


