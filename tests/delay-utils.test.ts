import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { delay } from '../delay-utils.js';

describe('delay-utils', () => {
  beforeEach(() => {
    // Intercepts the native timers architecture before each test block
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restores original real timers behaviors to isolate states
    jest.useRealTimers();
  });

  it('should return a pending Promise instance immediately upon execution', () => {
    const promise = delay(100);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('should resolve the promise strictly after the specified duration expires', async () => {
    const msToWait = 500;
    const promise = delay(msToWait);

    // Spies on the promise state to ensure it is not resolved prematurely
    const spy = jest.fn();
    promise.then(spy);

    // Fast-forwards timers to 499ms (1ms short of completion)
    await jest.advanceTimersByTimeAsync(msToWait - 1);
    expect(spy).not.toHaveBeenCalled();

    // Advances the final millisecond to trigger resolution trigger
    await jest.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should default to a fallback duration of 100ms when parameter is omitted', async () => {
    const promise = delay();
    const spy = jest.fn();
    promise.then(spy);

    // Should still be pending at 99ms
    await jest.advanceTimersByTimeAsync(99);
    expect(spy).not.toHaveBeenCalled();

    // Resolves smoothly on exactly 100ms
    await jest.advanceTimersByTimeAsync(1);
    expect(spy).toHaveBeenCalled();
    await expect(promise).resolves.toBeUndefined();
  });

  it('should concurrently process multi-tier custom delay configurations safely', async () => {
    const d100 = delay(100);
    const d500 = delay(500);

    const s100 = jest.fn();
    const s500 = jest.fn();

    d100.then(s100);
    d500.then(s500);

    // Step 1: Advance to 100ms boundary
    await jest.advanceTimersByTimeAsync(100);
    expect(s100).toHaveBeenCalled();
    expect(s500).not.toHaveBeenCalled();

    // Step 2: Advance to 500ms boundary
    await jest.advanceTimersByTimeAsync(400);
    expect(s500).toHaveBeenCalled();
  });
});
