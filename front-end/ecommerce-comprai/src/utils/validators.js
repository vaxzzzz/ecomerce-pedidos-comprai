import {
    CPF_LENGTH,
    PHONE_MAX_LENGTH,
    PHONE_MIN_LENGTH,
    ZIP_CODE_LENGTH,
} from "../constants";

// Rules of the CPF check digits (official algorithm).
const CPF_FIRST_WEIGHT = 10;
const CPF_SECOND_WEIGHT = 11;
const CPF_DIVISOR = 11;
const CPF_MAX_REMAINDER_WITHOUT_ZERO = 2;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Removes everything that is not a digit (dots, dashes, spaces...).
 * @param {string} text
 * @returns {string} Only the digits.
 */
export function onlyDigits(text) {
    return String(text ?? "").replace(/\D/g, "");
}

/**
 * @param {string} email
 * @returns {boolean} True when the e-mail has a valid basic format.
 */
export function isValidEmail(email) {
    return EMAIL_PATTERN.test(String(email ?? "").trim());
}

/**
 * Calculates one CPF check digit.
 * @param {string} digits - The digits that come before the check digit.
 * @param {number} firstWeight - Weight of the first digit.
 * @returns {number} The check digit.
 */
function calculateCpfDigit(digits, firstWeight) {
    const sum = digits
        .split("")
        .reduce((total, digit, index) => total + Number(digit) * (firstWeight - index), 0);

    const remainder = (sum * 10) % CPF_DIVISOR;
    return remainder === 10 ? 0 : remainder;
}

/**
 * @param {string} cpf - CPF with or without punctuation.
 * @returns {boolean} True when length and check digits are correct.
 */
export function isValidCpf(cpf) {
    const digits = onlyDigits(cpf);

    if (digits.length !== CPF_LENGTH) return false;

    // Sequences like 111.111.111-11 pass the math but are not real CPFs.
    if (/^(\d)\1+$/.test(digits)) return false;

    const base = digits.slice(0, CPF_LENGTH - CPF_MAX_REMAINDER_WITHOUT_ZERO);
    const firstDigit = calculateCpfDigit(base, CPF_FIRST_WEIGHT);
    const secondDigit = calculateCpfDigit(base + firstDigit, CPF_SECOND_WEIGHT);

    return digits === base + firstDigit + secondDigit;
}

/**
 * @param {string} phone - Phone with DDD, with or without punctuation.
 * @returns {boolean} True for 10 or 11 digits.
 */
export function isValidPhone(phone) {
    const { length } = onlyDigits(phone);
    return length >= PHONE_MIN_LENGTH && length <= PHONE_MAX_LENGTH;
}

/**
 * @param {string} zipCode - CEP with or without dash.
 * @returns {boolean} True for 8 digits.
 */
export function isValidZipCode(zipCode) {
    return onlyDigits(zipCode).length === ZIP_CODE_LENGTH;
}
