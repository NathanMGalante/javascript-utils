let anyCompleterKeyNumber = 0;

let completerMap = {};

/**
 * Creates and returns a new completer with the specified key.
 * If no key is provided, a unique key will be generated and returned.
 *
 * @param {string|null} key - The key associated with the completer.
 * @returns {completerData} The completer object containing a future Promise,
 * a complete function, and a completeError function.
 */
export const completer = (key = null) => {
  let complete;
  let completeError;
  let future;

  future = new Promise((resolve, reject) => {
    complete = resolve;
    completeError = reject;
  }).finally(() => {
    delete completerMap[key];
  });

  const data = completerData(complete, completeError, future);
  if (key === null) {
    key = "anyCompleterKey" + anyCompleterKeyNumber++;
  }
  completerMap[key] = data;
  return completerMap[key];
};

/**
 * Retrieves the completer with the specified key.
 *
 * @param {string} key - The key associated with the completer to retrieve.
 * @returns {completerData|null} The completer object with the specified key,
 * or null if no completer with that key exists.
 */
export const getCompleter = (key) => {
  return completerMap[key] || null;
};

/**
 * Creates and returns an object containing the complete, completeError,
 * and future properties of a completer.
 *
 * @property {function} complete - A function that resolves the Promise with a value.
 * @property {function} completeError - A function that rejects the Promise with an error.
 * @property {Promise} future - The Promise object associated with the completer.
 */
const completerData = (complete, completeError, future) => ({
  complete,
  completeError,
  future,
});
