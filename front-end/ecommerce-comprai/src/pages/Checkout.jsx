import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import {
    ORDER_STATUS_BY_PAYMENT_RESULT,
    PAYMENT_METHOD,
    PAYMENT_METHOD_LABEL,
} from "../constants";
import { useCart } from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { getClients } from "../services/clientService";
import { createOrder, updateOrderStatus } from "../services/orderService";
import { processPayment } from "../services/paymentService";
import { formatCurrency } from "../utils/format";

/**
 * @param {object} client
 * @returns {string} Address in one line, e.g. "Rua A, 10 - Cidade/SP - CEP 00000-000".
 */
function formatAddress(client) {
    return `${client.street}, ${client.number} - ${client.city}/${client.state} - CEP ${client.zipCode}`;
}

function Checkout() {
    const navigate = useNavigate();
    const { items, totalPrice, clearCart } = useCart();
    const { data: clients, isLoading, error: loadError } = useFetch(getClients);

    const [clientId, setClientId] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHOD.PIX);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (items.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h1 className="fw-bold">Checkout</h1>
                <p className="text-secondary">Seu carrinho está vazio.</p>
                <Link to={ROUTES.CATALOG} className="btn btn-primary">Ver catálogo</Link>
            </div>
        );
    }

    if (isLoading) return <Loading message="Carregando clientes..." />;

    const selectedClient = clients?.find((client) => String(client.id) === clientId);

    /** Builds the order payload from the cart and the selected client. */
    function buildOrder() {
        return {
            clientId: selectedClient.id,
            clientName: selectedClient.name,
            address: formatAddress(selectedClient),
            paymentMethod,
            total: totalPrice,
            items: items.map(({ productId, name, price, quantity }) => ({ productId, name, price, quantity })),
        };
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");

        if (!selectedClient) {
            setErrorMessage("Selecione o cliente para continuar.");
            return;
        }

        setIsSubmitting(true);

        try {
            const order = await createOrder(buildOrder());
            const payment = await processPayment({
                orderId: order.id,
                method: paymentMethod,
                amount: totalPrice,
            });

            // The payment result decides the order status (approved → paid, declined → canceled...).
            await updateOrderStatus(order, ORDER_STATUS_BY_PAYMENT_RESULT[payment.result]);

            clearCart();
            navigate(ROUTES.PAYMENT_RESULT, { state: { orderId: order.id, result: payment.result } });
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Checkout</h1>

            <AlertMessage type="danger" message={loadError || errorMessage} />

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-7">
                        <section className="card border-0 shadow-sm p-4 mb-4">
                            <h2 className="h5">Cliente e endereço de entrega</h2>

                            <label htmlFor="client" className="form-label mt-2">Cliente</label>
                            <select
                                id="client"
                                className="form-select"
                                value={clientId}
                                onChange={(event) => setClientId(event.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {clients?.map((client) => (
                                    <option key={client.id} value={client.id}>{client.name}</option>
                                ))}
                            </select>

                            {selectedClient ? (
                                <p className="mt-3 mb-0">
                                    <i className="bi bi-geo-alt me-2" aria-hidden="true"></i>
                                    {formatAddress(selectedClient)}
                                </p>
                            ) : (
                                <p className="mt-3 mb-0 text-secondary">
                                    Não encontrou o cliente? <Link to={ROUTES.ADMIN_CLIENT_CREATE}>Cadastre aqui</Link>.
                                </p>
                            )}
                        </section>

                        <fieldset className="card border-0 shadow-sm p-4">
                            <legend className="h5">Forma de pagamento</legend>

                            {Object.values(PAYMENT_METHOD).map((method) => (
                                <div className="form-check" key={method}>
                                    <input
                                        id={`payment-${method}`}
                                        type="radio"
                                        name="paymentMethod"
                                        className="form-check-input"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={() => setPaymentMethod(method)}
                                    />
                                    <label htmlFor={`payment-${method}`} className="form-check-label">
                                        {PAYMENT_METHOD_LABEL[method]}
                                    </label>
                                </div>
                            ))}
                        </fieldset>
                    </div>

                    <div className="col-lg-5">
                        <section className="card border-0 shadow-sm p-4">
                            <h2 className="h5">Resumo do pedido</h2>

                            <ul className="list-unstyled">
                                {items.map((item) => (
                                    <li key={item.productId} className="d-flex justify-content-between py-1">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="fs-4 border-top pt-3">
                                Total: <strong className="text-primary">{formatCurrency(totalPrice)}</strong>
                            </p>

                            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                {isSubmitting ? "Processando pagamento..." : "Confirmar e pagar"}
                            </button>
                        </section>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
