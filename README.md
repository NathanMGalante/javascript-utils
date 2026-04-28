# @nathanmgalante/n-js-utils

[![npm version](https://badge.fury.io/js/%40nathanmgalante%2Fn-js-utils.svg)](https://badge.fury.io/js/@nathanmgalante/n-js-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and comprehensive JavaScript utility library with essential functions for file handling, Brazilian document validation, formatters, timers, and more.

## 📦 Installation

```bash
npm install @nathanmgalante/n-js-utils
```

## 🚀 Quick Start

```javascript
import { 
  isCpf, 
  formatCpf, 
  debounce, 
  delay, 
  HTTP_STATUS_CODES 
} from '@nathanmgalante/n-js-utils';

// Validate Brazilian CPF
if (isCpf('123.456.789-09')) {
  console.log('Valid CPF!');
}

// Format CPF
console.log(formatCpf('12345678909')); // '123.456.789-09'

// Debounce function calls
const debouncedSearch = debounce(searchFunction, 300);

// HTTP Status Codes
console.log(HTTP_STATUS_CODES.OK); // 200
```

## 📚 Features

### 🔍 Brazilian Document Validation
- **CPF validation**: `isCpf()`, `formatCpf()`
- **CNPJ validation**: `isCnpj()`, `formatCnpj()`
- **Generic document validation**: `isDocument()`, `formatDocument()`

### 📞 Phone Formatting
- **Phone formatting**: `formatPhone()`, `formatPhoneWithContryCode()`
- **Number extraction**: `onlyNumbers()`

### 📧 String & Email Validation
- **Email validation**: `isEmail()`
- **Null/empty checks**: `isNullOrEmpty()`

### 📁 File Handling
- **File operations**: `ensureFileProperties()`, `assembleFile()`, `renameFile()`
- **URL handling**: `getFileNameFromUrl()`, `fileToUrl()`
- **MIME types**: `getMimeTypeByExtension()`

### ⏱️ Timing Utilities
- **Debounce**: `debounce()` - Delay function execution
- **Delay**: `delay()` - Promise-based delay
- **Timer**: `timer()` - Countdown timer utilities
- **Duration constants**: Pre-defined time durations (ms, seconds, minutes)

### 🌐 System Detection
- **Device detection**: `isMobile()`, `isAndroid()`, `isIos()`
- **Camera modes**: `FACING_MODES`
- **Store redirection**: `redirectToStore()`

### 🔄 Regex Patterns
- **Common patterns**: `ALL_NOT_NUMBERS`, `ALL_HTML_TAGS`, `ALL_SYMBOLS`

### 📊 HTTP Status Codes
- **Complete reference**: `HTTP_STATUS_CODES` object with all standard HTTP codes

### 🎯 Auto-completion
- **Completer utilities**: `completer()`, `getCompleter()` for text completion

## 📖 API Reference

### Document Validation

```javascript
import { isCpf, isCnpj, isDocument, formatCpf, formatCnpj, formatDocument } from '@nathanmgalante/n-js-utils';

// Validation
isCpf('123.456.789-09');     // boolean
isCnpj('12.345.678/0001-95'); // boolean
isDocument('12345678909');     // boolean (CPF or CNPJ)

// Formatting
formatCpf('12345678909');           // '123.456.789-09'
formatCnpj('12345678000195');       // '12.345.678/0001-95'
formatDocument('12345678909');       // '123.456.789-09'
```

### Phone Formatting

```javascript
import { formatPhone, formatPhoneWithContryCode, onlyNumbers } from '@nathanmgalante/n-js-utils';

formatPhone('11987654321');                    // '(11) 98765-4321'
formatPhoneWithContryCode('11987654321');      // '+55 (11) 98765-4321'
onlyNumbers('(11) 98765-4321');                // '11987654321'
```

### File Operations

```javascript
import { 
  ensureFileProperties, 
  getFileNameFromUrl, 
  assembleFile, 
  fileToUrl,
  getMimeTypeByExtension 
} from '@nathanmgalante/n-js-utils';

// File validation and processing
ensureFileProperties(file);           // Validates file properties
getFileNameFromUrl('http://example.com/file.jpg'); // 'file.jpg'
assembleFile(blob, 'filename.jpg');   // Creates File object
fileToUrl(file);                      // Creates object URL
getMimeTypeByExtension('.jpg');       // 'image/jpeg'
```

### Timing Utilities

```javascript
import { debounce, delay, timer } from '@nathanmgalante/n-js-utils';
import { DURATION_1_SECOND, DURATION_5_MINUTES } from '@nathanmgalante/n-js-utils';

// Debounce function calls
const debouncedFn = debounce(myFunction, 300);

// Promise-based delay
await delay(1000); // Wait 1 second

// Timer utilities
const { start, stop, reset, getTime } = timer();

// Duration constants
console.log(DURATION_1_SECOND);    // 1000
console.log(DURATION_5_MINUTES);   // 300000
```

### System Detection

```javascript
import { isMobile, isAndroid, isIos, FACING_MODES, redirectToStore } from '@nathanmgalante/n-js-utils';

if (isMobile()) {
  console.log('Mobile device detected');
  
  if (isAndroid()) {
    redirectToStore('android');
  } else if (isIos()) {
    redirectToStore('ios');
  }
}

// Camera facing modes
console.log(FACING_MODES.USER);    // 'user'
console.log(FACING_MODES.ENVIRONMENT); // 'environment'
```

### HTTP Status Codes

```javascript
import { HTTP_STATUS_CODES } from '@nathanmgalante/n-js-utils';

console.log(HTTP_STATUS_CODES.OK);           // 200
console.log(HTTP_STATUS_CODES.NOT_FOUND);    // 404
console.log(HTTP_STATUS_CODES.INTERNAL_ERROR); // 500
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- **NPM**: https://www.npmjs.com/package/@nathanmgalante/n-js-utils
- **GitHub**: https://github.com/NathanMGalante/javascript-utils
- **Issues**: https://github.com/NathanMGalante/javascript-utils/issues

## 📊 Package Info

- **Version**: 1.0.0
- **License**: MIT
- **Author**: Nathan Moreno Galante
- **Type**: ES Module
- **Name**: @nathanmgalante/n-js-utils