# @nathanmgalante/n-js-utils

[![npm version](https://badge.fury.io/js/%40nathanmgalante%2Fn-js-utils.svg)](https://badge.fury.io/js/@nathanmgalante/n-js-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, modular, and fully typed JavaScript/TypeScript utility library focused on real-world Brazilian development needs — covering document validation, phone formatting, file handling, async timing, device detection, regex patterns, and HTTP constants.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Document Validation](#document-validation)
  - [Document Formatters](#document-formatters)
  - [Phone Formatters](#phone-formatters)
  - [String Formatters](#string-formatters)
  - [File Utilities](#file-utilities)
  - [Validation Utilities](#validation-utilities)
  - [Timing Utilities](#timing-utilities)
  - [Duration Constants](#duration-constants)
  - [System & Device Detection](#system--device-detection)
  - [Regex Patterns](#regex-patterns)
  - [HTTP Status Codes](#http-status-codes)
  - [Completer Utilities](#completer-utilities)
- [TypeScript Support](#typescript-support)
- [Testing](#testing)
- [License](#license)

---

## Installation

```bash
npm install @nathanmgalante/n-js-utils
```

---

## Quick Start

```typescript
import {
  isCpf,
  formatCpf,
  formatPhone,
  debounce,
  delay,
  statusCodes,
  isMobile,
} from '@nathanmgalante/n-js-utils';

// Validate a Brazilian CPF
isCpf('111.444.777-35'); // true

// Format a CPF
formatCpf('11144477735'); // '111.444.777-35'

// Format a phone number
formatPhone('11912345678'); // '(11) 91234-5678'

// Debounce an async function
const result = await debounce('search', () => fetchResults(query), 300);

// Promise-based delay
await delay(1000);

// HTTP status reference
console.log(statusCodes.NOT_FOUND); // 404

// Mobile device check
if (isMobile()) console.log('Running on mobile');
```

---

## API Reference

### Document Validation

Functions to validate Brazilian CPF and CNPJ documents.

```typescript
import { isCpf, isCnpj, isDocument } from '@nathanmgalante/n-js-utils';
```

#### `isCpf(value: string | number): boolean`

Validates a CPF using the Modulo 11 algorithm. Accepts formatted or raw strings.

```typescript
isCpf('111.444.777-35'); // true
isCpf('11144477735');    // true
isCpf('00000000000');    // false — repeated digit sequence
isCpf('123');            // false — invalid length
```

#### `isCnpj(value: string | number): boolean`

Validates a CNPJ using the Modulo 11 algorithm with rotating weights.

```typescript
isCnpj('11.222.333/0001-81'); // true
isCnpj('11222333000181');     // true
isCnpj('00000000000000');     // false — repeated digit sequence
```

#### `isDocument(value: string): boolean`

Accepts any Brazilian document and determines its type automatically.

```typescript
isDocument('11144477735');    // true — valid CPF
isDocument('11222333000181'); // true — valid CNPJ
isDocument('00000000000');    // false
```

---

### Document Formatters

```typescript
import { formatCpf, formatCnpj, formatDocument } from '@nathanmgalante/n-js-utils';
```

#### `formatCpf(value: string | number): string`

Formats a valid CPF. Returns an empty string if invalid.

```typescript
formatCpf('11144477735');   // '111.444.777-35'
formatCpf(11144477735);     // '111.444.777-35'
formatCpf('111.444.777-35');// '111.444.777-35' — already formatted
formatCpf('00000000000');   // '' — invalid
```

#### `formatCnpj(value: string | number): string`

Formats a valid CNPJ. Returns an empty string if invalid.

```typescript
formatCnpj('11222333000181');    // '11.222.333/0001-81'
formatCnpj('11.222.333/0001-81');// '11.222.333/0001-81' — already formatted
formatCnpj('00000000000000');    // '' — invalid
```

#### `formatDocument(value: string | number): string`

Attempts CPF formatting first, then CNPJ. Returns an empty string if neither matches.

```typescript
formatDocument('11144477735');   // '111.444.777-35'
formatDocument('11222333000181');// '11.222.333/0001-81'
formatDocument('00000000000000');// ''
```

---

### Phone Formatters

```typescript
import { formatPhone, formatPhoneWithContryCode } from '@nathanmgalante/n-js-utils';
```

#### `formatPhone(phone: string | number | null | undefined): string`

Applies a Brazilian phone mask based on digit count. Automatically strips the `+55` country prefix if present.

| Input | Output | Description |
|---|---|---|
| `'12345678'` | `'1234-5678'` | 8-digit local landline |
| `'123456789'` | `'12345-6789'` | 9-digit local mobile |
| `'1112345678'` | `'(11) 1234-5678'` | 10-digit DDD + landline |
| `'11912345678'` | `'(11) 91234-5678'` | 11-digit DDD + mobile |
| `'+5511912345678'` | `'(11) 91234-5678'` | Strips +55 prefix |
| `null` / `undefined` | `''` | Safe null handling |

#### `formatPhoneWithContryCode(phone: string): string`

Formats a phone number that includes the country code prefix.

| Input | Output | Description |
|---|---|---|
| `'5511999999999'` | `'+55 (11) 99999-9999'` | 13-digit country + DDD + mobile |
| `'551133334444'` | `'+55 (11) 3333-4444'` | 12-digit country + DDD + landline |

---

### String Formatters

```typescript
import { onlyNumbers } from '@nathanmgalante/n-js-utils';
```

#### `onlyNumbers(value: string | number): string`

Strips all non-numeric characters from a string or number.

```typescript
onlyNumbers('(11) 9 1234-5678'); // '11912345678'
onlyNumbers('111.444.777-35');   // '11144477735'
onlyNumbers(123456);             // '123456'
onlyNumbers('abcdef');           // ''
```

---

### File Utilities

```typescript
import {
  ensureFileProperties,
  assembleFile,
  getFileNameFromUrl,
  fileToUrl,
  getMimeTypeByExtension,
  isBase64,
  renameFile,
  urlToFile,
  blobToFile,
  getBase64FromFile,
  getBase64FromUrl,
  getBase64FromFileObj,
  getBase64FromFileWithoutMimeType,
  ensureBase64WithoutMimeType,
  assembleFileFromBase64,
  assembleFileWithTypeFromBase64,
  assembleUrlFromBase64,
  mergeMimeTypeWithBase64,
  getMimeTypeFromBase64,
  getExtensionFromBase64,
  getExtensionFromMimeType,
} from '@nathanmgalante/n-js-utils';
```

#### `ensureFileProperties<T extends CustomFile>(file: T): T`

Guarantees that a file-like object has `url`, `type`, and `name` populated.

```typescript
const file = ensureFileProperties({ url: 'https://example.com/photo.jpg' });
// { url: '...', type: 'image/jpeg', name: 'photo.jpg' }
```

#### `assembleFile(file): Promise<CustomFile | null>`

Normalizes any file input — URL string, Base64 string, `File`, or plain object — into a standard `CustomFile`.

```typescript
const file = await assembleFile('https://example.com/document.pdf');
const file2 = await assembleFile('data:image/png;base64,iVBOR...');
const file3 = await assembleFile(new File([blob], 'image.png'));
```

#### `getFileNameFromUrl(url: string): string`

Extracts the filename from the last URL segment.

```typescript
getFileNameFromUrl('https://cdn.example.com/uploads/photo.jpg'); // 'photo.jpg'
```

#### `fileToUrl(file: File | Blob): string`

Creates a temporary browser Blob URL.

```typescript
const url = fileToUrl(file); // 'blob:https://...'
```

#### `getMimeTypeByExtension(extension: string): string | false`

Resolves the MIME type for a given extension or file path using the `mime` package.

```typescript
getMimeTypeByExtension('.jpg');      // 'image/jpeg'
getMimeTypeByExtension('file.pdf');  // 'application/pdf'
getMimeTypeByExtension('.xyz');      // false
```

#### `isBase64(str: unknown): boolean`

Checks whether a string is a valid raw Base64 or Data URL.

```typescript
isBase64('data:image/png;base64,iVBOR...');  // true
isBase64('aGVsbG8=');                        // true
isBase64('https://example.com/image.png');   // false
```

#### `renameFile(file: File, fileName: string): File`

Returns a new `File` instance with an updated name, preserving the original MIME type.

```typescript
const renamed = renameFile(originalFile, 'new-name.jpg');
```

#### `getBase64FromFile(file: File | Blob): Promise<string>`

Reads a file and returns the full Data URL string.

```typescript
const dataUrl = await getBase64FromFile(file);
// 'data:image/png;base64,iVBOR...'
```

#### `getBase64FromUrl(url: string): Promise<string>`

Fetches a remote file and returns it as a Base64 Data URL.

```typescript
const base64 = await getBase64FromUrl('https://example.com/image.jpg');
```

#### `ensureBase64WithoutMimeType(base64?: string): string | undefined`

Strips the Data URL prefix, returning only the raw Base64 payload.

```typescript
ensureBase64WithoutMimeType('data:image/png;base64,iVBOR...'); // 'iVBOR...'
```

#### `assembleFileFromBase64(base64Data: string, filename: string): File`

Converts a Data URL into a proper `File` object.

```typescript
const file = assembleFileFromBase64('data:image/png;base64,iVBOR...', 'photo.png');
```

#### `mergeMimeTypeWithBase64(mimeType: string, base64: string): string`

Prepends a MIME type header to a raw Base64 string.

```typescript
mergeMimeTypeWithBase64('image/png', 'iVBOR...'); // 'data:image/png;base64,iVBOR...'
```

---

### Validation Utilities

```typescript
import { isEmail, isNullOrEmpty } from '@nathanmgalante/n-js-utils';
```

#### `isEmail(email: string): boolean`

Validates an email address using the HTML5/W3C compliant pattern.

```typescript
isEmail('user@example.com');       // true
isEmail('user.name+tag@domain.io');// true
isEmail('invalid@');               // false
isEmail('@domain.com');            // false
```

#### `isNullOrEmpty(value: unknown): boolean`

Returns `true` if the value is `null`, `undefined`, an empty string, empty array, or empty object.

```typescript
isNullOrEmpty(null);       // true
isNullOrEmpty('');         // true
isNullOrEmpty('  ');       // true
isNullOrEmpty([]);         // true
isNullOrEmpty({});         // true
isNullOrEmpty('hello');    // false
isNullOrEmpty([1, 2, 3]);  // false
```

---

### Timing Utilities

```typescript
import { debounce, debounceCancel, debouncePromise, delay, timer } from '@nathanmgalante/n-js-utils';
```

#### `debounce<T>(key, callback, duration?): Promise<T | null>`

Debounces an async callback under a string key. Multiple calls within the duration window cancel each other — only the last one executes. Defaults to 300ms.

```typescript
// Only fires once after the user stops typing for 300ms
const result = await debounce('search', () => fetchResults(query), 300);
```

#### `debounceCancel(key: string): void`

Immediately cancels a pending debounce and resolves its promise with `null`.

```typescript
debounceCancel('search');
```

#### `debouncePromise<T>(key: string): Promise<T | null>`

Returns the pending promise for an active debounce key without triggering a new execution.

```typescript
const pending = await debouncePromise('search');
```

#### `delay(duration?: number): Promise<void>`

Returns a `Promise` that resolves after the given number of milliseconds. Defaults to 100ms.

```typescript
await delay(500);  // waits 500ms
await delay();     // waits 100ms
```

#### `timer(duration: number, callback: () => void): TimerControls`

Creates a countdown timer that executes a callback after the given duration. Returns control methods.

```typescript
const t = timer(5000, () => console.log('Done!'));

t.stop();    // pauses and stores remaining time
t.play();    // resumes from where it stopped
t.reset();   // resets to original duration without starting
t.restart(); // resets and immediately starts again
t.cancel();  // cancels and prevents callback execution
```

---

### Duration Constants

Pre-defined millisecond values to avoid magic numbers in timeouts, debounces, cache TTLs, and token expirations.

```typescript
import {
  DURATION_10_MILLISECONDS,
  DURATION_300_MILLISECONDS,
  DURATION_1_SECOND,
  DURATION_30_SECONDS,
  DURATION_1_MINUTE,
  DURATION_15_MINUTES,
  DURATION_1_HOUR,
  DURATION_1_DAY,
  DURATION_7_DAYS,
  DURATION_30_DAYS,
} from '@nathanmgalante/n-js-utils';
```

| Constant | Value (ms) |
|---|---|
| `DURATION_10_MILLISECONDS` | 10 |
| `DURATION_50_MILLISECONDS` | 50 |
| `DURATION_100_MILLISECONDS` | 100 |
| `DURATION_200_MILLISECONDS` | 200 |
| `DURATION_300_MILLISECONDS` | 300 |
| `DURATION_500_MILLISECONDS` | 500 |
| `DURATION_1_SECOND` | 1,000 |
| `DURATION_2_SECONDS` | 2,000 |
| `DURATION_3_SECONDS` | 3,000 |
| `DURATION_5_SECONDS` | 5,000 |
| `DURATION_10_SECONDS` | 10,000 |
| `DURATION_15_SECONDS` | 15,000 |
| `DURATION_30_SECONDS` | 30,000 |
| `DURATION_45_SECONDS` | 45,000 |
| `DURATION_1_MINUTE` | 60,000 |
| `DURATION_2_MINUTES` | 120,000 |
| `DURATION_5_MINUTES` | 300,000 |
| `DURATION_10_MINUTES` | 600,000 |
| `DURATION_15_MINUTES` | 900,000 |
| `DURATION_30_MINUTES` | 1,800,000 |
| `DURATION_45_MINUTES` | 2,700,000 |
| `DURATION_1_HOUR` | 3,600,000 |
| `DURATION_2_HOURS` | 7,200,000 |
| `DURATION_6_HOURS` | 21,600,000 |
| `DURATION_12_HOURS` | 43,200,000 |
| `DURATION_1_DAY` | 86,400,000 |
| `DURATION_7_DAYS` | 604,800,000 |
| `DURATION_30_DAYS` | 2,592,000,000 |

---

### System & Device Detection

```typescript
import { isMobile, isAndroid, isIos, FACING_MODES, redirectToStore } from '@nathanmgalante/n-js-utils';
```

#### `isMobile(): boolean`

Detects mobile devices using a comprehensive user agent pattern list.

```typescript
isMobile(); // true on phones and tablets
```

#### `isAndroid(): boolean`

```typescript
isAndroid(); // true on Android devices
```

#### `isIos(): boolean`

Detects iPhone, iPad, and iPod devices. Excludes IE with `MSStream`.

```typescript
isIos(); // true on iOS devices
```

#### `FACING_MODES`

A frozen constant object for `MediaTrackConstraints` camera facing modes.

```typescript
FACING_MODES.USER;        // 'user'
FACING_MODES.ENVIRONMENT; // 'environment'
FACING_MODES.LEFT;        // 'left'
FACING_MODES.RIGHT;       // 'right'
```

#### `redirectToStore(androidHref, iosHref, defaultHref, location?): void`

Redirects the user to the appropriate app store based on their platform. Falls back to `defaultHref` on desktop. Accepts an optional `location` object for testing purposes.

```typescript
redirectToStore(
  'https://play.google.com/store/apps/details?id=com.example',
  'https://apps.apple.com/app/example/id000000000',
  'https://example.com'
);
```

---

### Regex Patterns

A collection of pre-built, globally-flagged regex patterns for common string operations.

```typescript
import {
  ALL_NUMBERS,
  ALL_NOT_NUMBERS,
  ALL_LETTERS,
  ALL_NOT_LETTERS,
  ALL_NUMBERS_AND_LETTERS,
  ALL_NOT_NUMBERS_AND_LETTERS,
  ALL_WHITESPACES,
  ALL_NOT_WHITESPACES,
  ALL_HTML_TAGS,
  ALL_NOT_HTML_TAGS,
  ALL_SYMBOLS,
  ALL_NOT_SYMBOLS,
  ALL_EMOJIS,
  ALL_NOT_EMOJIS,
  NOT_ASCII,
  ONLY_ASCII,
  EMAIL,
  UUID_V4,
  URL,
  HEX_COLOR,
  JSON_STRING,
  IPV4,
  JWT,
  REPEATED_SAME_DIGIT,
  NOT_REPEATED_SAME_DIGIT,
} from '@nathanmgalante/n-js-utils';
```

| Pattern | Flag | Description |
|---|---|---|
| `ALL_NUMBERS` | `g` | Matches all digit characters |
| `ALL_NOT_NUMBERS` | `g` | Matches all non-digit characters |
| `ALL_LETTERS` | `g` | Matches all ASCII letters |
| `ALL_NOT_LETTERS` | `g` | Matches all non-letter characters |
| `ALL_NUMBERS_AND_LETTERS` | `g` | Matches all alphanumeric characters |
| `ALL_NOT_NUMBERS_AND_LETTERS` | `g` | Matches all non-alphanumeric characters |
| `ALL_WHITESPACES` | `g` | Matches spaces, tabs, and line breaks |
| `ALL_NOT_WHITESPACES` | `g` | Matches all non-whitespace characters |
| `ALL_HTML_TAGS` | `g` | Matches opening and closing HTML tags |
| `ALL_NOT_HTML_TAGS` | `g` | Matches text content between HTML tags |
| `ALL_SYMBOLS` | `g` | Matches punctuation and symbol characters |
| `ALL_NOT_SYMBOLS` | `g` | Matches word characters and whitespace |
| `ALL_EMOJIS` | `gu` | Matches Unicode emoji codepoints |
| `ALL_NOT_EMOJIS` | `gu` | Matches all non-emoji characters |
| `NOT_ASCII` | `g` | Matches characters outside the printable ASCII range |
| `ONLY_ASCII` | — | Full-string match for printable ASCII only |
| `EMAIL` | — | W3C-compliant email format validation |
| `UUID_V4` | — | Standard UUID v4 format |
| `URL` | — | HTTP/HTTPS/FTP URL format |
| `HEX_COLOR` | — | 3, 4, 6, or 8-digit hex color codes |
| `JSON_STRING` | — | Structurally valid JSON objects or arrays |
| `IPV4` | — | Valid IPv4 address (0.0.0.0 – 255.255.255.255) |
| `JWT` | — | Three-segment base64url JWT structure |
| `REPEATED_SAME_DIGIT` | — | Sequences of a single repeated digit |
| `NOT_REPEATED_SAME_DIGIT` | — | Sequences with at least one differing character |

---

### HTTP Status Codes

```typescript
import { statusCodes } from '@nathanmgalante/n-js-utils';
import type { StatusCode } from '@nathanmgalante/n-js-utils';
```

A frozen object containing all standard HTTP status codes organized by category (1xx–5xx).

```typescript
statusCodes.OK;                    // 200
statusCodes.CREATED;               // 201
statusCodes.NOT_FOUND;             // 404
statusCodes.INTERNAL_SERVER_ERROR; // 500
statusCodes.IM_A_TEAPOT;           // 418
```

The `StatusCode` type is a union of all valid status code numbers:

```typescript
const handleResponse = (status: StatusCode) => { ... };
```

---

### Completer Utilities

Inspired by Dart's `Completer` pattern — allows creating a Promise whose resolution is controlled externally.

```typescript
import { completer, getCompleter } from '@nathanmgalante/n-js-utils';
import type { CompleterData } from '@nathanmgalante/n-js-utils';
```

#### `completer<T>(key?: string | null): CompleterData<T>`

Creates a new completer. If no key is provided, a unique one is generated automatically.

```typescript
const c = completer<string>('my-key');

// Somewhere else in your code
c.complete('resolved value');

// Await the result
const result = await c.future; // 'resolved value'
```

#### `getCompleter<T>(key: string): CompleterData<T> | null`

Retrieves an active completer by key.

```typescript
const c = getCompleter<string>('my-key');
c?.complete('done');
```

---

## TypeScript Support

This library is written in TypeScript and ships with full type declarations. All functions are generically typed where applicable.

Key exported types:

```typescript
import type {
  CustomFile,
  CompleterData,
  StatusCode,
  FacingMode,
  TimerInstance,
} from '@nathanmgalante/n-js-utils';
```

---

## Testing

```bash
npm test
```

The test suite uses Jest with `ts-jest` and `jest-environment-jsdom` for browser API coverage. All utilities have unit tests including edge cases, boundary conditions, and type-level checks.

---

## License

MIT © [Nathan Moreno Galante](https://github.com/NathanMGalante)

---

## Links

- **NPM**: https://www.npmjs.com/package/@nathanmgalante/n-js-utils
- **GitHub**: https://github.com/NathanMGalante/javascript-utils
- **Issues**: https://github.com/NathanMGalante/javascript-utils/issues
