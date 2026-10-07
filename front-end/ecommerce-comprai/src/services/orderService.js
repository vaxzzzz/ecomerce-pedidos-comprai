import api from "./api";
import { ENDPOINTS, ORDER_STATUS } from "../constants";

/**
 * @returns {Promise<Array>} All orders.
 */
export async function getOrders() {
    const { data } = await api.get(ENDPOINTS.ORDERS);
    return data;
}

/**
 * @param {string|number} id - Order id.
 * @returns {Promise<object>} The order (throws if it does not exist).
 */
export async function getOrderById(id) {
    const { data } = await api.get(`${ENDPOINTS.ORDERS}/${id}`);
    return data;
}

/**
 * Creates an order with status "pending" and the first history entry.
 * @param {object} order - Order data (client, address, items, total, payment method).
 * @returns {Promise<object>} The created order (with id).
 */
export async function createOrder(order) {
    const now = new Date().toISOString();

    const { data } = await api.post(ENDPOINTS.ORDERS, {
        ...order,
        status: ORDER_STATUS.PENDING,
        createdAt: now,
        statusHistory: [{ status: ORDER_STATUS.PENDING, date: now }],
    });

    return data;
}

/**
 * Changes the status of an order and records the change in its history.
 * @param {object} order - The current order.
 * @param {string} newStatus - One of ORDER_STATUS.
 * @returns {Promise<object>} The updated order.
 */
export async function updateOrderStatus(order, newStatus) {
    // Nothing to do if the status is the same (avoids a duplicated history entry).
    if (order.status === newStatus) return order;

    const statusHistory = [
        ...order.statusHistory,
        { status: newStatus, date: new Date().toISOString() },
    ];

    const { data } = await api.patch(`${ENDPOINTS.ORDERS}/${order.id}`, {
        status: newStatus,
        statusHistory,
    });

    return data;
}
