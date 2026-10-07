import { Link } from "react-router-dom";
import QuantityStepper from "../components/QuantityStepper";
import { MIN_QUANTITY } from "../constants";
import { useCart } from "../hooks/useCart";
import { buildPath, ROUTES } from "../routes/AppRoutes";
import { formatCurrency } from "../utils/format";

function Cart() {
    const { items, totalPrice, changeQuantity, removeItem, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="container py-5">
                <h1 className="fw-bold mb-4">Meu carrinho</h1>

                <div className="text-center py-5">
                    <i className="bi bi-cart-x display-1 text-secondary" aria-hidden="true"></i>
                    <h2 className="h4 mt-4">Seu carrinho está vazio</h2>
                    <p className="text-secondary">Adicione produtos para começar sua compra.</p>
                    <Link to={ROUTES.CATALOG} className="btn btn-primary">
                        Ver catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Meu carrinho</h1>

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <caption className="visually-hidden">Itens do carrinho</caption>
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Produto</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Quantidade</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col"><span className="visually-hidden">Ações</span></th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((item) => (
                                <tr key={item.productId}>
                                    <td>
                                        <Link to={buildPath.productDetails(item.productId)}>{item.name}</Link>
                                    </td>
                                    <td>{formatCurrency(item.price)}</td>
                                    <td>
                                        <QuantityStepper
                                            label={`Quantidade de ${item.name}`}
                                            value={item.quantity}
                                            min={MIN_QUANTITY}
                                            max={item.stock}
                                            onChange={(quantity) => changeQuantity(item.productId, quantity)}
                                        />
                                    </td>
                                    <td className="fw-semibold">{formatCurrency(item.price * item.quantity)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            aria-label={`Remover ${item.name} do carrinho`}
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            <i className="bi bi-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={clearCart}>
                    Limpar carrinho
                </button>

                <div className="text-end">
                    <p className="fs-4 mb-2">
                        Total: <strong className="text-primary">{formatCurrency(totalPrice)}</strong>
                    </p>
                    <Link to={ROUTES.CHECKOUT} className="btn btn-primary btn-lg">
                        Finalizar compra
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Cart;
