import { EMAIL } from '../regex-utils.js';

/**
 * Validates an email address string using the RFC 5322 standard regex.
 * 
 * This pattern checks for:
 * 1. Standard formats (user@domain.com)
 * 2. Quoted identifiers ("user name"@domain.com)
 * 3. IP-based domains (user@[127.0.0.1])
 * 4. Subdomains and modern TLDs (user@mail.sub.domain.solutions)
 * 
 * @param email - The email string to be validated.
 * @returns True if the email format is valid, false otherwise.
 */
export const isEmail = (email: string): boolean => EMAIL.test(email);

export default isEmail;
