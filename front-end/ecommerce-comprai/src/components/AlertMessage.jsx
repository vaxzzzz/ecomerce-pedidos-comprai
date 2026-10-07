/**
 * Success / error / warning message with an optional close button.
 * Renders nothing when there is no message.
 * @param {{type?: "success"|"danger"|"warning"|"info", message?: string,
 *   onClose?: Function}} props
 */
function AlertMessage({ type = "info", message, onClose }) {
    if (!message) return null;

    return (
        <div
            className={`alert alert-${type} d-flex justify-content-between align-items-start`}
            role="alert"
        >
            <span>{message}</span>

            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Fechar mensagem"
                    onClick={onClose}
                ></button>
            )}
        </div>
    );
}

export default AlertMessage;
