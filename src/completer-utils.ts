let anyCompleterKeyNumber = 0;

/**
 * Interface representing the structure of a completer object.
 * Inspired by Dart's Completer architecture.
 */
export interface CompleterData<T = any> {
  /** A function that resolves the Promise with a value. */
  complete: (value: T | PromiseLike<T>) => void;
  /** A function that rejects the Promise with an error. */
  completeError: (reason?: any) => void;
  /** The Promise object associated with the completer. */
  future: Promise<T>;
}

// Typing the central map to hold dynamic types of completers safely
const completerMap: Record<string, CompleterData<any>> = {};

/**
 * Creates and returns an object containing the complete, completeError,
 * and future properties of a completer.
 */
const createCompleterData = <T>(
  complete: (value: T | PromiseLike<T>) => void,
  completeError: (reason?: any) => void,
  future: Promise<T>
): CompleterData<T> => ({
  complete,
  completeError,
  future,
});

/**
 * Creates and returns a new completer associated with a specific key.
 * If no key is provided, a unique key will be generated.
 *
 * @param key - The key associated with the completer.
 * @returns The completer object containing a future Promise, a complete function, and a completeError function.
 */
export const completer = <T = any>(key: string | null = null): CompleterData<T> => {
  let complete!: (value: T | PromiseLike<T>) => void;
  let completeError!: (reason?: any) => void;

  const currentKey = key ?? `anyCompleterKey${anyCompleterKeyNumber++}`;

  const future = new Promise<T>((resolve, reject) => {
    complete = resolve;
    completeError = reject;
  }).finally(() => {
    delete completerMap[currentKey];
  });

  const data = createCompleterData(complete, completeError, future);
  completerMap[currentKey] = data;

  return data;
};

/**
 * Retrieves an active completer by its specified key.
 *
 * @param key - The key associated with the completer to retrieve.
 * @returns The completer object with the specified key, or null if it does not exist.
 */
export const getCompleter = <T = any>(key: string): CompleterData<T> | null => {
  return (completerMap[key] as CompleterData<T>) || null;
};
