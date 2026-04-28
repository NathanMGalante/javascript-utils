/**
 * Validates an email address string using the RFC 5322 standard regex.
 * * This pattern checks for:
 * 1. Standard formats (user@domain.com)
 * 2. Quoted identifiers ("user name"@domain.com)
 * 3. IP-based domains (user@[127.0.0.1])
 * 4. Subdomains and modern TLDs (user@mail.sub.domain.solutions)
 * * @param {string} email - The email string to be validated.
 * @returns {boolean} True if the email format is valid, false otherwise.
 */
const isEmail = (email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
        email
    )

export default isEmail
