import { useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import { ORDER_STATUS, ORDER_STATUS_COLOR, ORDER_STATUS_LABEL } from "../constants";
import { useFetch } from "../hooks/useFetch";
import { buildPath } from "../routes/AppRoutes";
import { getOrders } from "../services/orderService";
import { formatCurrency, formatDateTime } from "../utils/format";

function Orders() {
    const { data: orders, isLoading, error } = useFetch(getOrders);
    const [statusFilter, setStatusFilter] = useState("");

    if (isLoading) return <Loading message="Carregando pedidos..." />;

    const filteredOrders = (orders ?? [])
        .filter((order) => statusFilter === "" || order.status === statusFilter)
        .reverse(); // newest first (filter already made a copy)

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Meus pedidos</h1>

            <AlertMessage type="danger" message={error} />

            <div className="mb-4" style={{ maxWidth: "20rem" }}>
                <label htmlFor="status-filter" className="form-label">Filtrar por status</label>
                <select
                    id="status-filter"
                    className="form-select"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                >
                    <option value="">Todos</option>
                    {Object.values(ORDER_STATUS).map((status) => (
                        <option key={status} value={status}>{ORDER_STATUS_LABEL[status]}</option>
                    ))}
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="alert alert-info">Nenhum pedido encontrado.</div>
            ) : (
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <caption className="visually-hidden">Lista de pedidos</caption>
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Pedido</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col"><span className="visually-hidden">Ações</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{formatDateTime(order.createdAt)}</td>
                                        <td>{order.clientName}</td>
                                        <td>{formatCurrency(order.total)}</td>
                                        <td>
                                            <span className={`badge text-bg-${ORDER_STATUS_COLOR[order.status]}`}>
                                                {ORDER_STATUS_LABEL[order.status]}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={buildPath.orderDetails(order.id)} className="btn btn-sm btn-outline-primary">
                                                Detalhes
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders;
