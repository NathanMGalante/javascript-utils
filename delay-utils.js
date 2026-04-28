/**
 * Returns a Promise that resolves after a specified duration.
 *
 * @param {number} [duration=100] - The duration to delay in milliseconds. Defaults to 100ms if not specified.
 * @returns {Promise} A Promise that resolves after the specified duration.
 */
export const delay = (duration = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};
