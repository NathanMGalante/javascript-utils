@nathanmgalante/n-js-utils
A lightweight and comprehensive JavaScript utility library featuring essential tools for Brazilian document validation, file handling, system detection, timers, and more. Designed for modern web applications.

📦 Installation
Bash
npm install @nathanmgalante/n-js-utils
🚀 Quick Start
JavaScript
import { isCpf, formatCpf, debounce, HTTP_STATUS_CODES } from '@nathanmgalante/n-js-utils';

// Brazilian Document Handling
if (isCpf('123.456.789-09')) {
  console.log('Valid CPF!');
}

// Optimization
const debouncedSearch = debounce(searchFunction, 300);

// Status Codes
if (response.status === HTTP_STATUS_CODES.OK) {
  // ...
}
📚 Core Features
🇧🇷 Document Validation & Formatting
Reliable tools to validate and format Brazilian personal and business identifiers.

CPF & CNPJ: Support for both validation and mask formatting.

Generic Documents: Smart validation that detects document type automatically.

⏱️ Utilities & Timing
Flow Control: debounce to optimize event handling.

Async Helpers: delay for clean promise-based timeouts.

Timer Engine: Advanced timer instance for precise countdown and interval management.

Duration Constants: Pre-defined constants (e.g., DURATION_1_MINUTE) to improve code readability.

📁 File & Media Operations
File Processing: Utilities to validate, rename, and assemble blobs/files.

URL Handling: Extracts metadata from URLs and handles MIME type lookups based on file extensions.

📱 System & Environment
Device Detection: Quickly identify platform characteristics (isMobile, isAndroid, isIos).

Store Redirection: Logic to route users to the correct App/Play Store.

Camera Configuration: Constants for camera facing modes.

⚙️ Development Helpers
Completer: A stateful utility to track and manage completion status of background tasks or async processes.

Regex Patterns: Ready-to-use patterns for HTML tags, symbols, and numeric cleaning.

HTTP Status Codes: A comprehensive dictionary of standard status codes.

📖 API Highlights
Completer Utility
Used to manage the lifecycle and status of asynchronous tasks or completion logic.

JavaScript
import { completer } from '@nathanmgalante/n-js-utils';

const task = completer();
// Manage task state (complete, reset, etc.)
System Detection
JavaScript
import { isMobile, redirectToStore } from '@nathanmgalante/n-js-utils';

if (isMobile()) {
  redirectToStore(
    'https://play.google.com/...', 
    'https://apps.apple.com/...', 
    'https://fallback.com'
  );
}
File Operations
JavaScript
import { getMimeTypeByExtension, assembleFile } from '@nathanmgalante/n-js-utils';

const type = getMimeTypeByExtension('.pdf'); // 'application/pdf'
🧪 Testing
The library includes a comprehensive suite of unit tests. Run them using:

Bash
npm test
🤝 Contributing
Contributions are highly welcome! Please follow the existing code style and submit a Pull Request.

🔗 Links
NPM: https://www.npmjs.com/package/@nathanmgalante/n-js-utils

GitHub: https://github.com/NathanMGalante/javascript-utils

Issues: https://github.com/NathanMGalante/javascript-utils/issues

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed by Nathan Moreno Galante