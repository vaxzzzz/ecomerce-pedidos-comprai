import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "../constants";

// Single axios instance: if the real API changes (URL, headers, token),
// only this file needs to be edited.
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
});

/**
 * Converts any request error into a message that can be shown to the user.
 * @param {unknown} error - Error thrown by axios or by our own code.
 * @returns {string} Friendly message in Portuguese.
 */
export function getErrorMessage(error) {
    if (error?.response) {
        return `O servidor respondeu com erro (${error.response.status}). Tente novamente.`;
    }

    if (error?.request) {
        return "Não foi possível conectar à API. Verifique se o servidor está rodando (npm run api).";
    }

    return error?.message ?? "Ocorreu um erro inesperado.";
}

export default api;
