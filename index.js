// Completer utilities
export { completer, getCompleter } from './completer-utils.js'

// Debounce utilities
export { debounce } from './debounce-utils.js'

// Delay utilities
export { delay } from './delay-utils.js'

// Duration utilities
export {
  DURATION_10_MILLISECONDS,
  DURATION_100_MILLISECONDS,
  DURATION_300_MILLISECONDS,
  DURATION_500_MILLISECONDS,
  DURATION_1_SECOND,
  DURATION_2_SECONDS,
  DURATION_5_SECONDS,
  DURATION_10_SECONDS,
  DURATION_15_SECONDS,
  DURATION_30_SECONDS,
  DURATION_1_MINUTE,
  DURATION_2_MINUTES,
  DURATION_5_MINUTES,
  DURATION_10_MINUTES,
  DURATION_15_MINUTES,
  DURATION_30_MINUTES,
} from './duration-utils.js'

// File utilities
export {
  ensureFileProperties,
  getFileNameFromUrl,
  assembleFile,
  fileToUrl,
  getMimeTypeByExtension,
  renameFile,
} from './file-utils.js'

// Regex utilities
export {
  ALL_NOT_NUMBERS,
  ALL_HTML_TAGS,
  ALL_SYMBOLS,
} from './regex-utils.js'

// Status codes utilities
import statusCodes from './status_codes-utils.js'
export { statusCodes as HTTP_STATUS_CODES }

// System utilities
export {
  FACING_MODES,
  isMobile,
  isAndroid,
  isIos,
  redirectToStore,
} from './system-utils.js'

// Timer utilities
export { timer } from './timer-utils.js'

// Formatters
export {
  formatCpf,
  formatCnpj,
  formatDocument,
} from './formatters/document-formatter-utils.js'

export {
  formatPhone,
  formatPhoneWithContryCode,
} from './formatters/phone-formatter-utils.js'

export { onlyNumbers } from './formatters/string-formatter-utils.js'

// Validations
export {
  isCnpj,
  isCpf,
  isDocument,
  isEmail,
  isNullOrEmpty,
} from './validations/index.js'
