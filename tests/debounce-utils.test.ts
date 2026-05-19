import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { debounce } from '../debounce-utils.js';

describe('debounce-utils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return a pending Promise immediately upon execution', () => {
    const callback = async () => 'result';
    const result = debounce('test-key', callback, 100);

    expect(result).toBeInstanceOf(Promise);
  });

  it('should execution-debounce multiple calls and resolve only the last one', async () => {
    const callback = jest.fn<() => Promise<string>>().mockResolvedValue('final-data');
    const key = 'search-input';
    const delay = 300;

    const p1 = debounce(key, callback, delay);
    const p2 = debounce(key, callback, delay);
    const p3 = debounce(key, callback, delay);

    await jest.advanceTimersByTimeAsync(delay - 1);
    expect(callback).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(1);

    expect(callback).toHaveBeenCalledTimes(1);
    await expect(p3).resolves.toBe('final-data');
  });

  it('should isolate distinct debouncing contexts independently by key parameters', async () => {
    const callbackA = jest.fn<() => Promise<string>>().mockResolvedValue('response-A');
    const callbackB = jest.fn<() => Promise<string>>().mockResolvedValue('response-B');
    const delay = 200;

    const promiseA = debounce('key-A', callbackA, delay);

    await jest.advanceTimersByTimeAsync(100);
    const promiseB = debounce('key-B', callbackB, delay);

    await jest.advanceTimersByTimeAsync(100);
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).not.toHaveBeenCalled();
    await expect(promiseA).resolves.toBe('response-A');

    await jest.advanceTimersByTimeAsync(100);
    expect(callbackB).toHaveBeenCalledTimes(1);
    await expect(promiseB).resolves.toBe('response-B');
  });

  it('should fall back onto a safe default execution timeout of 300ms if omitted', async () => {
    const callback = jest.fn<() => Promise<string>>().mockResolvedValue('default-ok');

    const promise = debounce('default-key', callback);

    await jest.advanceTimersByTimeAsync(299);
    expect(callback).not.toHaveBeenCalled();

    await jest.advanceTimersByTimeAsync(1);
    expect(callback).toHaveBeenCalledTimes(1);
    await expect(promise).resolves.toBe('default-ok');
  });
});
