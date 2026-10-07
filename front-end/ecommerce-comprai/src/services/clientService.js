import api from "./api";
import { ENDPOINTS } from "../constants";

/**
 * @returns {Promise<Array>} All clients.
 */
export async function getClients() {
    const { data } = await api.get(ENDPOINTS.CLIENTS);
    return data;
}

/**
 * @param {string|number} id - Client id.
 * @returns {Promise<object>} The client (throws if it does not exist).
 */
export async function getClientById(id) {
    const { data } = await api.get(`${ENDPOINTS.CLIENTS}/${id}`);
    return data;
}

/**
 * @param {object} client - Client data without id.
 * @returns {Promise<object>} The created client (with id).
 */
export async function createClient(client) {
    const { data } = await api.post(ENDPOINTS.CLIENTS, client);
    return data;
}

/**
 * @param {string|number} id - Client id.
 * @param {object} client - Full client data.
 * @returns {Promise<object>} The updated client.
 */
export async function updateClient(id, client) {
    const { data } = await api.put(`${ENDPOINTS.CLIENTS}/${id}`, client);
    return data;
}
