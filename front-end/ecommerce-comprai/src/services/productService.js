import api from "./api";
import { ENDPOINTS } from "../constants";

/**
 * @returns {Promise<Array>} All products.
 */
export async function getProducts() {
    const { data } = await api.get(ENDPOINTS.PRODUCTS);
    return data;
}

/**
 * @param {string|number} id - Product id.
 * @returns {Promise<object>} The product (throws if it does not exist).
 */
export async function getProductById(id) {
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS}/${id}`);
    return data;
}

/**
 * @param {object} product - Product data without id.
 * @returns {Promise<object>} The created product (with id).
 */
export async function createProduct(product) {
    const { data } = await api.post(ENDPOINTS.PRODUCTS, product);
    return data;
}

/**
 * @param {string|number} id - Product id.
 * @param {object} product - Full product data.
 * @returns {Promise<object>} The updated product.
 */
export async function updateProduct(id, product) {
    const { data } = await api.put(`${ENDPOINTS.PRODUCTS}/${id}`, product);
    return data;
}

/**
 * @param {string|number} id - Product id.
 * @returns {Promise<void>}
 */
export async function deleteProduct(id) {
    await api.delete(`${ENDPOINTS.PRODUCTS}/${id}`);
}
