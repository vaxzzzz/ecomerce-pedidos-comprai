/**
 * Formats a number as Brazilian currency.
 * @param {number} value - Amount in reais.
 * @returns {string} Text like "R$ 1.234,50".
 */
export function formatCurrency(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

/**
 * Formats an ISO date string for display.
 * @param {string} isoDate - Date in ISO format.
 * @returns {string} Text like "05/10/2026 14:30".
 */
export function formatDateTime(isoDate) {
    return new Date(isoDate).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    });
}
