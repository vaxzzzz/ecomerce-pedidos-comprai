import {
    ORDER_STATUS,
    ORDER_STATUS_FLOW,
    ORDER_STATUS_LABEL,
} from "../constants";
import { formatDateTime } from "../utils/format";

/**
 * Status timeline of an order: pending → paid → shipped → delivered.
 * @param {{status: string, history: Array<{status: string, date: string}>}} props
 */
function OrderTimeline({ status, history = [] }) {
    const isCanceled = status === ORDER_STATUS.CANCELED;
    const currentStep = ORDER_STATUS_FLOW.indexOf(status);

    // Finds the date when the order reached a given status.
    function getStatusDate(stepStatus) {
        const entry = history.find((item) => item.status === stepStatus);
        return entry ? formatDateTime(entry.date) : "";
    }

    return (
        <div>
            <ol className="order-timeline list-unstyled mb-0" aria-label="Linha do tempo do pedido">
                {ORDER_STATUS_FLOW.map((step, index) => {
                    const isDone = !isCanceled && index <= currentStep;
                    const isCurrent = !isCanceled && index === currentStep;

                    return (
                        <li
                            key={step}
                            className={`order-timeline-step ${isDone ? "is-done" : ""}`}
                            aria-current={isCurrent ? "step" : undefined}
                        >
                            <span className="order-timeline-dot" aria-hidden="true">
                                {isDone && <i className="bi bi-check-lg"></i>}
                            </span>
                            <span className="fw-semibold d-block">{ORDER_STATUS_LABEL[step]}</span>
                            <span className="small text-secondary">{getStatusDate(step)}</span>
                        </li>
                    );
                })}
            </ol>

            {isCanceled && (
                <p className="text-danger fw-semibold mt-3 mb-0">
                    <i className="bi bi-x-circle me-2" aria-hidden="true"></i>
                    Pedido cancelado em {getStatusDate(ORDER_STATUS.CANCELED)}
                </p>
            )}
        </div>
    );
}

export default OrderTimeline;
