type VoidCallback = () => void;

type Timeout = ReturnType<typeof setTimeout>

export type TimerInstance = ReturnType<typeof timer>;

interface TimerControls {
  play: VoidCallback;
  stop: VoidCallback;
  cancel: VoidCallback;
  reset: VoidCallback;
  restart: VoidCallback;
}

/**
 * Timer function that receives a duration in milliseconds and a callback function
 * to be executed when the timer finishes.
 *
 * @param {number} duration - The duration of the timer in milliseconds.
 * @param {function} callback - The callback function to be executed when the timer finishes.
 * @returns {Object} An object with methods to control the timer: play, stop, cancel, reset, and restart.
 */
export const timer = (duration: number, callback: VoidCallback): TimerControls => {
  let timeoutId: Timeout | null = null;
  let startTime: number | null = null;
  let remainingTime = duration;
  let ended = false;

  /**
   * Finalizes the timer by resetting the internal state to its initial values.
   */
  const finalize = () => {
    timeoutId = null;
    startTime = null;
    remainingTime = 0;
    ended = true;
  };

  /**
   * Starts or resumes the timer.
   */
  const play = () => {
    if (!ended) {
      startTime = Date.now();

      if (remainingTime <= 0) {
        finalize();
        callback();
      } else {
        timeoutId = setTimeout(() => {
          finalize();
          callback();
        }, remainingTime);
      }
    }
  };

  /**
   * Stops the timer.
   */
  const stop = () => {
    if (!ended && !!timeoutId) {
      clearTimeout(timeoutId);
      if (!!startTime) {
        remainingTime = Math.max(remainingTime - (Date.now() - startTime), 0);
      }
    }
  };

  /**
   * Cancels the timer.
   */
  const cancel = () => {
    if (!ended && !!timeoutId) {
      clearTimeout(timeoutId);
      finalize();
    }
  };

  /**
   * Resets the timer to its initial state.
   */
  const reset = () => {
    !!timeoutId && clearTimeout(timeoutId);
    timeoutId = null;
    startTime = null;
    remainingTime = duration;
    ended = false;
  };

  /**
   * Restarts the timer by resetting the internal state and starting it again.
   */
  const restart = () => {
    reset();
    play();
  };

  play();

  return { play, stop, cancel, reset, restart };
};
