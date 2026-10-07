import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import ConfirmModal from "../components/ConfirmModal";
import Loading from "../components/Loading";
import OrderTimeline from "../components/OrderTimeline";
import {
    ORDER_STATUS,
    ORDER_STATUS_COLOR,
    ORDER_STATUS_FLOW,
    ORDER_STATUS_LABEL,
    PAYMENT_METHOD_LABEL,
} from "../constants";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { getOrderById, updateOrderStatus } from "../services/orderService";
import { formatCurrency, formatDateTime } from "../utils/format";

/**
 * @param {string} status - Current order status.
 * @returns {string|null} The next status in the normal flow, or null if there is none.
 */
function getNextStatus(status) {
    const index = ORDER_STATUS_FLOW.indexOf(status);
    return ORDER_STATUS_FLOW[index + 1] ?? null;
}

function OrderDetails() {
    const { id } = useParams();
    const fetchOrder = useCallback(() => getOrderById(id), [id]);
    const { data: order, setData: setOrder, isLoading, error } = useFetch(fetchOrder);

    const [errorMessage, setErrorMessage] = useState("");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    if (isLoading) return <Loading message="Carregando pedido..." />;

    if (error || !order) {
        return (
            <div className="container py-5 text-center">
                <h1>Pedido não encontrado</h1>
                <Link to={ROUTES.ORDERS} className="btn btn-primary mt-3">Voltar para pedidos</Link>
            </div>
        );
    }

    const nextStatus = getNextStatus(order.status);
    const canCancel = order.status !== ORDER_STATUS.CANCELED && order.status !== ORDER_STATUS.DELIVERED;

    async function changeStatus(newStatus) {
        setErrorMessage("");

        try {
            setOrder(await updateOrderStatus(order, newStatus));
        } catch (requestError) {
            setErrorMessage(getErrorMessage(requestError));
        }
    }

    async function handleConfirmCancel() {
        setIsCancelModalOpen(false);
        await changeStatus(ORDER_STATUS.CANCELED);
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.ORDERS} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <h1 className="fw-bold mb-0">Pedido #{order.id}</h1>
                <span className={`badge fs-6 text-bg-${ORDER_STATUS_COLOR[order.status]}`}>
                    {ORDER_STATUS_LABEL[order.status]}
                </span>
            </div>

            <AlertMessage type="danger" message={errorMessage} onClose={() => setErrorMessage("")} />

            <div className="row g-4">
                <div className="col-lg-7">
                    <section className="card border-0 shadow-sm p-4 mb-4">
                        <h2 className="h5">Itens</h2>
                        <ul className="list-unstyled mb-0">
                            {order.items.map((item) => (
                                <li key={item.productId} className="d-flex justify-content-between py-1">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="fs-5 border-top pt-3 mt-3 mb-0">
                            Total: <strong>{formatCurrency(order.total)}</strong>
                        </p>
                    </section>

                    <section className="card border-0 shadow-sm p-4">
                        <h2 className="h5">Dados do pedido</h2>
                        <dl className="mb-0">
                            <dt>Cliente</dt>
                            <dd>{order.clientName}</dd>
                            <dt>Endereço de entrega</dt>
                            <dd>{order.address}</dd>
                            <dt>Pagamento</dt>
                            <dd>{PAYMENT_METHOD_LABEL[order.paymentMethod]}</dd>
                            <dt>Criado em</dt>
                            <dd className="mb-0">{formatDateTime(order.createdAt)}</dd>
                        </dl>
                    </section>
                </div>

                <div className="col-lg-5">
                    <section className="card border-0 shadow-sm p-4">
                        <h2 className="h5 mb-3">Status do pedido</h2>
                        <OrderTimeline status={order.status} history={order.statusHistory} />

                        <div className="d-flex flex-wrap gap-2 mt-4">
                            {nextStatus && order.status !== ORDER_STATUS.CANCELED && (
                                <button type="button" className="btn btn-primary" onClick={() => changeStatus(nextStatus)}>
                                    Avançar para: {ORDER_STATUS_LABEL[nextStatus]}
                                </button>
                            )}

                            {canCancel && (
                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsCancelModalOpen(true)}>
                                    Cancelar pedido
                                </button>
                            )}
                        </div>
                    </section>
                </div>
            </div>

            <ConfirmModal
                isOpen={isCancelModalOpen}
                title="Cancelar pedido"
                message={`Tem certeza que deseja cancelar o pedido #${order.id}?`}
                confirmLabel="Cancelar pedido"
                onConfirm={handleConfirmCancel}
                onCancel={() => setIsCancelModalOpen(false)}
            />
        </div>
    );
}

export default OrderDetails;
