import { completer } from './completer-utils.js'
import { DURATION_300_MILLISECONDS } from './duration-utils.js'
import { timer } from './timer-utils.js'

/**
 * Registry to track active debounce operations by their unique keys.
 * Each entry manages its own timer, execution ID, and promise controller.
 * @type {Object.<string, Object>}
 */
let debounceMap = {}

/**
 * Creates a new debounce state container.
 * @returns {Object} A fresh debounce item with an ID, completer, and timer.
 */
const debounceItem = () => ({
  id: 0,
  completer: new completer(),
  timer: new timer(),
})

/**
 * Delays the execution of a callback until a specified duration has passed 
 * since the last time this specific key was invoked.
 * * @param {string} key - Unique identifier to isolate different debounce operations.
 * @param {Function} callback - The async function to execute after the delay.
 * @param {number} [duration=DEFAULT_TIME] - Delay in milliseconds.
 * @returns {Promise<any>} A promise that resolves with the callback result or rejects on error.
 */
export const debounce = async (
  key = '',
  callback = () => { },
  duration = DURATION_300_MILLISECONDS
) => {
  // If the key exists, reset the timer and increment ID to invalidate previous calls
  if (Object.keys(debounceMap).includes(key)) {
    debounceMap[key].timer.cancel()
    debounceMap[key].id++
  } else {
    debounceMap[key] = new debounceItem()
  }

  let id = debounceMap[key].id

  debounceMap[key].timer = timer(duration, async () => {
    try {
      const result = await callback()
      // Ensure we only complete if this was the last triggered call for this key
      if (id === debounceMap[key].id) {
        debounceMap[key]?.completer.complete(result)
        delete debounceMap[key]
      }
    } catch (error) {
      if (id === debounceMap[key].id) {
        debounceMap[key]?.completer.completeError(error)
        delete debounceMap[key]
      }
    }
  })

  return await debouncePromise(key)
}

/**
 * Retrieves the promise (Future) associated with an active debounce operation.
 * * @param {string} key - The unique identifier for the debounce operation.
 * @returns {Promise<any>|null} The pending promise if active, otherwise null.
 */
export const debouncePromise = async (key) => {
  if (Object.keys(debounceMap).includes(key)) {
    return await debounceMap[key]?.completer.future
  }
  return null
}

/**
 * Immediately cancels a pending debounce operation and resolves its promise.
 * * @param {string} key - The unique identifier to cancel.
 */
export const debounceCancel = (key) => {
  if (Object.keys(debounceMap).includes(key)) {
    debounceMap[key]?.timer.cancel()
    debounceMap[key]?.completer.complete()
    delete debounceMap[key]
  }
}