/**
 * ============================================================================
 * Millisecond Durations Reference Cheat Sheet
 * Use these constants to avoid magic numbers in setTimeout, debounce, 
 * cache TTL, token expirations, and animation values.
 * ============================================================================
 */

// --- Milliseconds & Sub-Seconds ---
/** 10 milliseconds */
export const DURATION_10_MILLISECONDS = 10;
/** 50 milliseconds - Useful for high-frequency UI updates */
export const DURATION_50_MILLISECONDS = 50;
/** 100 milliseconds */
export const DURATION_100_MILLISECONDS = 100;
/** 200 milliseconds - Common subtle transition duration */
export const DURATION_200_MILLISECONDS = 200;
/** 300 milliseconds - Standard UI animation/debounce threshold */
export const DURATION_300_MILLISECONDS = 300;
/** 500 milliseconds - Half a second */
export const DURATION_500_MILLISECONDS = 500;

// --- Seconds ---
/** 1 second */
export const DURATION_1_SECOND = 1000;
/** 2 seconds */
export const DURATION_2_SECONDS = 2000;
/** 3 seconds - Great for toast notifications / snackbars */
export const DURATION_3_SECONDS = 3000;
/** 5 seconds */
export const DURATION_5_SECONDS = 5000;
/** 10 seconds - Standard API request timeout limits */
export const DURATION_10_SECONDS = 10000;
/** 15 seconds */
export const DURATION_15_SECONDS = 15000;
/** 30 seconds - Long polling / Gateway timeouts */
export const DURATION_30_SECONDS = 30000;
/** 45 seconds */
export const DURATION_45_SECONDS = 45000;

// --- Minutes ---
/** 1 minute */
export const DURATION_1_MINUTE = 60000;
/** 2 minutes */
export const DURATION_2_MINUTES = 120000;
/** 5 minutes - Common short-lived cache / verification code expiration */
export const DURATION_5_MINUTES = 300000;
/** 10 minutes */
export const DURATION_10_MINUTES = 600000;
/** 15 minutes - Standard short access token (JWT) lifespan */
export const DURATION_15_MINUTES = 900000;
/** 30 minutes */
export const DURATION_30_MINUTES = 1800000;
/** 45 minutes */
export const DURATION_45_MINUTES = 2700000;

// --- Hours ---
/** 1 hour - Typical local storage or session state expiration */
export const DURATION_1_HOUR = 3600000;
/** 2 hours */
export const DURATION_2_HOURS = 7200000;
/** 6 hours */
export const DURATION_6_HOURS = 21600000;
/** 12 hours - Standard mid-day database or state refresh rate */
export const DURATION_12_HOURS = 43200000;

// --- Days ---
/** 1 day (24 hours) - Perfect for daily background sync / cookie expiration */
export const DURATION_1_DAY = 86400000;
/** 7 days (1 week) - Standard sliding window expiration / long session limits */
export const DURATION_7_DAYS = 604800000;
/** 30 days (Standard Month) - Maximum fallback persistent state threshold */
export const DURATION_30_DAYS = 2592000000;
