import { createContext, useEffect, useState } from "react";
import { CART_STORAGE_KEY, MIN_QUANTITY } from "../constants";

// The hook `useCart` is the normal way to read this context.
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

/**
 * Reads the saved cart from localStorage.
 * @returns {Array} Saved items, or an empty list if nothing valid is saved.
 */
function loadSavedCart() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        // Corrupted JSON or blocked storage: start with an empty cart.
        console.warn("Could not read the saved cart:", error);
        return [];
    }
}

/**
 * Keeps the quantity between the minimum and the product stock.
 * @param {number} quantity
 * @param {number} stock
 * @returns {number}
 */
function limitQuantity(quantity, stock) {
    return Math.min(Math.max(quantity, MIN_QUANTITY), stock);
}

/**
 * Shares the cart with the whole app and keeps it saved in the browser,
 * so it survives page reloads.
 */
export function CartProvider({ children }) {
    const [items, setItems] = useState(loadSavedCart);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addItem(product, quantity = MIN_QUANTITY) {
        setItems((current) => {
            const existing = current.find((item) => item.productId === product.id);

            if (existing) {
                return current.map((item) =>
                    item.productId === product.id
                        ? { ...item, quantity: limitQuantity(item.quantity + quantity, item.stock) }
                        : item
                );
            }

            const newItem = {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                stock: product.stock,
                quantity: limitQuantity(quantity, product.stock),
            };

            return [...current, newItem];
        });
    }

    function removeItem(productId) {
        setItems((current) => current.filter((item) => item.productId !== productId));
    }

    function changeQuantity(productId, quantity) {
        setItems((current) =>
            current.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: limitQuantity(quantity, item.stock) }
                    : item
            )
        );
    }

    function clearCart() {
        setItems([]);
    }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        changeQuantity,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
