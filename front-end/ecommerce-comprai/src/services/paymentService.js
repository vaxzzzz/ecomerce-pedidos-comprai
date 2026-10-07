import api from "./api";
import {
    CARD_APPROVAL_RATE,
    ENDPOINTS,
    PAYMENT_METHOD,
    PAYMENT_RESULT,
    PAYMENT_SIMULATION_DELAY_MS,
} from "../constants";

/**
 * Decides the simulated result of a payment.
 * The real back-end will do this job; here we only imitate it.
 * @param {string} method - One of PAYMENT_METHOD.
 * @returns {string} One of PAYMENT_RESULT.
 */
function simulatePaymentResult(method) {
    if (method === PAYMENT_METHOD.PIX) return PAYMENT_RESULT.APPROVED;
    if (method === PAYMENT_METHOD.BOLETO) return PAYMENT_RESULT.PENDING;

    return Math.random() < CARD_APPROVAL_RATE
        ? PAYMENT_RESULT.APPROVED
        : PAYMENT_RESULT.DECLINED;
}

function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Sends a simulated payment and returns the result.
 * @param {{orderId: string|number, method: string, amount: number}} payment
 * @returns {Promise<object>} The saved payment, with the field `result`.
 */
export async function processPayment({ orderId, method, amount }) {
    // Small delay so the user can see the "processing" state.
    await wait(PAYMENT_SIMULATION_DELAY_MS);

    const { data } = await api.post(ENDPOINTS.PAYMENTS, {
        orderId,
        method,
        amount,
        result: simulatePaymentResult(method),
        createdAt: new Date().toISOString(),
    });

    return data;
}
