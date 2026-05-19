import { completer, type CompleterData } from './completer-utils.js';
import { DURATION_300_MILLISECONDS } from './duration-utils.js';
import { timer, type TimerInstance } from './timer-utils.js';

interface DebounceItem<T = any> {
  id: number;
  completer: CompleterData<T>;
  timer: TimerInstance | null;
}

const debounceMap: Record<string, DebounceItem<any>> = {};

/**
 * Creates a new debounce state container.
 * Note: Removed the unused 'duration' parameter.
 */
const createDebounceItem = <T>(): DebounceItem<T> => ({
  id: 0,
  completer: completer<T>(),
  timer: null,
});

export const debounce = async <T>(
  key = '',
  callback: () => T | Promise<T> = () => ({} as T),
  duration: number = DURATION_300_MILLISECONDS
): Promise<T | null> => {
  if (key in debounceMap) {
    debounceMap[key].timer?.cancel();
    debounceMap[key].id++;
  } else {
    // Adjusted: Removed the argument since createDebounceItem doesn't use it anymore
    debounceMap[key] = createDebounceItem<T>();
  }

  const currentId = debounceMap[key].id;

  debounceMap[key].timer = timer(duration, async () => {
    try {
      const result = await callback();
      
      // Strict TypeScript Check: using ? before accessing .id or .completer
      // because debounceMap[key] could theoretically be deleted or undefined
      if (currentId === debounceMap[key]?.id) {
        debounceMap[key]!.completer.complete(result);
        delete debounceMap[key];
      }
    } catch (error) {
      if (currentId === debounceMap[key]?.id) {
        debounceMap[key]!.completer.completeError(error);
        delete debounceMap[key];
      }
    }
  });

  return await debouncePromise<T>(key);
};

export const debouncePromise = async <T>(key: string): Promise<T | null> => {
  if (key in debounceMap) {
    return await debounceMap[key].completer.future;
  }
  return null;
};

export const debounceCancel = (key: string): void => {
  if (key in debounceMap) {
    debounceMap[key].timer?.cancel();
    debounceMap[key].completer.complete(null);
    delete debounceMap[key];
  }
};
