import { delay } from '../delay-utils.js'

describe('delay-utils', () => {
  it('should return a promise', () => {
    const promise = delay(100)
    expect(promise).toBeInstanceOf(Promise)
  })

  it('should resolve after specified duration', async () => {
    const start = Date.now()
    await delay(50)
    const duration = Date.now() - start
    
    expect(duration).toBeGreaterThanOrEqual(40)
  })

  it('should use default duration of 100ms', async () => {
    const promise = delay()
    expect(promise).toBeInstanceOf(Promise)
    await expect(promise).resolves.toBeUndefined()
  })

  it('should accept custom durations', async () => {
    const d100 = delay(100)
    const d500 = delay(500)
    const d1000 = delay(1000)

    expect(d100).toBeInstanceOf(Promise)
    expect(d500).toBeInstanceOf(Promise)
    expect(d1000).toBeInstanceOf(Promise)

    await d100
    await d500
    await d1000
  })
})
