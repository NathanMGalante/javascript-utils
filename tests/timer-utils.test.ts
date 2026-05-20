import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { timer, type TimerInstance } from '../src/timer-utils.js';

describe('timer-utils', () => {
    // Enables fake Jest timers before each test
    beforeEach(() => {
        jest.useFakeTimers();
    });

    // Restores the real clock after each test to not affect other files
    afterEach(() => {
        jest.useRealTimers();
    });

    it('should create a timer object with accurate typing', () => {
        const callback = jest.fn(); // Using a Jest mock function
        const t: TimerInstance = timer(100, callback);

        expect(t).toBeDefined();
        expect(typeof t).toBe('object');
    });

    it('should have all required control methods', () => {
        const t = timer(100, () => { });

        expect(t.play).toBeInstanceOf(Function);
        expect(t.stop).toBeInstanceOf(Function);
        expect(t.cancel).toBeInstanceOf(Function);
        expect(t.reset).toBeInstanceOf(Function);
        expect(t.restart).toBeInstanceOf(Function);
    });

    it('should execute the callback only after the specified duration', () => {
        const callback = jest.fn();
        timer(100, callback);

        expect(callback).not.toHaveBeenCalled();

        // Advances the virtual clock by 99ms (should not have run yet)
        jest.advanceTimersByTime(99);
        expect(callback).not.toHaveBeenCalled();

        // Advances the remaining 1ms to complete 100ms
        jest.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should control the timer states accurately (play, stop, restart, reset)', () => {
        let value = 1;
        const t = timer(100, () => {
            value++;
        });

        expect(value).toBe(1);

        // 1. Verifies normal execution after 100ms
        jest.advanceTimersByTime(100);
        expect(value).toBe(2);

        // 2. Tests restart: resets the timer, advances 50ms and ensures it didn't execute before time
        t.restart();
        jest.advanceTimersByTime(50);
        expect(value).toBe(2);

        // Advances another 50ms (totaling 100ms from restart) -> should go to 3
        jest.advanceTimersByTime(50);
        expect(value).toBe(3);

        // 3. Tests reset and play: clears the inner timeout context window and initializes a clean 100ms cycle
        t.reset();
        t.play();
        expect(value).toBe(3); // Value should remain unchanged since execution hasn't completed yet

        // Fast-forwards 50ms into the new clean cycle window; callback shouldn't trigger yet
        jest.advanceTimersByTime(50);
        expect(value).toBe(3);

        // 4. Tests pause/stop mid-flight: locks the timer progress state safely at the 50ms mark
        t.stop();

        // Advances the clock another 50ms; ensures the timer remains completely frozen while paused
        jest.advanceTimersByTime(50);
        expect(value).toBe(3);

        // 5. Tests playback resumption: wakes up the timer instance to process the remaining 50ms delta window
        t.play();

        // Advanced remaining 50ms to reach the full 100ms execution target boundary -> should increment to 4
        jest.advanceTimersByTime(50);
        expect(value).toBe(4);
    });

    it('should cancel the timer and prevent execution', () => {
        const callback = jest.fn();
        const t = timer(100, callback);

        jest.advanceTimersByTime(50);
        t.cancel();

        // Advances the remaining time and proves that the callback was ignored due to cancellation
        jest.advanceTimersByTime(50);
        expect(callback).not.toHaveBeenCalled();
    });
});
