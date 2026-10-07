import { Link, useLocation } from "react-router-dom";
import { PAYMENT_RESULT } from "../constants";
import { buildPath, ROUTES } from "../routes/AppRoutes";

// How each simulated result is presented to the user.
const RESULT_DISPLAY = {
    [PAYMENT_RESULT.APPROVED]: {
        color: "success",
        icon: "bi-check-circle",
        title: "Pagamento aprovado!",
        text: "Seu pedido foi confirmado e já está sendo preparado.",
    },
    [PAYMENT_RESULT.PENDING]: {
        color: "warning",
        icon: "bi-hourglass-split",
        title: "Pagamento pendente",
        text: "Estamos aguardando a confirmação do pagamento (ex.: compensação do boleto).",
    },
    [PAYMENT_RESULT.DECLINED]: {
        color: "danger",
        icon: "bi-x-circle",
        title: "Pagamento recusado",
        text: "Não foi possível aprovar o pagamento. O pedido foi cancelado; tente novamente.",
    },
};

function PaymentResult() {
    // The checkout page sends the result through the navigation state.
    const { state } = useLocation();
    const display = state ? RESULT_DISPLAY[state.result] : null;

    if (!display) {
        return (
            <div className="container py-5 text-center">
                <h1 className="fw-bold">Resultado do pagamento</h1>
                <p className="text-secondary">Nenhum pagamento recente para mostrar.</p>
                <Link to={ROUTES.ORDERS} className="btn btn-primary">Ver meus pedidos</Link>
            </div>
        );
    }

    return (
        <div className="container py-5 text-center">
            <i className={`bi ${display.icon} display-1 text-${display.color}`} aria-hidden="true"></i>
            <h1 className="fw-bold mt-3">{display.title}</h1>
            <p className="text-secondary">{display.text}</p>

            <div className="d-flex justify-content-center gap-2 flex-wrap">
                <Link to={buildPath.orderDetails(state.orderId)} className="btn btn-primary">
                    Ver pedido
                </Link>
                <Link to={ROUTES.CATALOG} className="btn btn-outline-secondary">
                    Continuar comprando
                </Link>
            </div>
        </div>
    );
}

export default PaymentResult;
