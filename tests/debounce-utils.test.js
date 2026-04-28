import { debounce } from '../debounce-utils.js'

describe('debounce-utils', () => {
  it('should return a promise', async () => {
    const callback = async () => 'result'
    const key = 'test-debounce-1'
    
    const result = debounce(key, callback, 10)
    expect(result).toBeInstanceOf(Promise)
  })

  it('should accept a callback function', () => {
    const callback = async () => 'result'
    expect(() => {
      debounce('test-key', callback, 10)
    }).not.toThrow()
  })

  it('should accept different durations', () => {
    const callback = async () => 'result'
    expect(() => {
      debounce('key1', callback, 100)
      debounce('key2', callback, 500)
      debounce('key3', callback, 1000)
    }).not.toThrow()
  })
})
