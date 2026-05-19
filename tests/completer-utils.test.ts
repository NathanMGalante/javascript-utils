import { completer, getCompleter } from '../completer-utils.js'

describe('completer-utils', () => {
  it('should create a completer with a promise', () => {
    const c = completer()
    expect(c).toHaveProperty('complete')
    expect(c).toHaveProperty('completeError')
    expect(c).toHaveProperty('future')
    expect(c.future).toBeInstanceOf(Promise)
  })

  it('should complete a promise successfully', async () => {
    const c = completer()
    c.complete('success')
    const result = await c.future
    expect(result).toBe('success')
  })

  it('should reject a promise with error', async () => {
    const c = completer()
    c.completeError(new Error('test error'))
    
    await expect(c.future).rejects.toThrow('test error')
  })

  it('should store and retrieve completer by key', () => {
    const c = completer('my-key')
    const retrieved = getCompleter('my-key')
    expect(retrieved).toBe(c)
  })

  it('should return null for non-existent key', () => {
    const retrieved = getCompleter('non-existent-key-xyz')
    expect(retrieved).toBeNull()
  })

  it('should generate unique keys when none provided', () => {
    const c1 = completer()
    const c2 = completer()
    expect(c1).not.toBe(c2)
  })
})
