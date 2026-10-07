import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

/**
 * Gives access to the shared cart.
 * @returns {{items: Array, totalItems: number, totalPrice: number,
 *   addItem: Function, removeItem: Function, changeQuantity: Function,
 *   clearCart: Function}}
 */
export function useCart() {
    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error("useCart must be used inside <CartProvider>.");
    }

    return cart;
}
