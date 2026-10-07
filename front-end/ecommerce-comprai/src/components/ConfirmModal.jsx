import { useEffect } from "react";

const ESCAPE_KEY = "Escape";

/**
 * Confirmation dialog (used before deleting/canceling something).
 * @param {{isOpen: boolean, title: string, message: string,
 *   confirmLabel?: string, onConfirm: Function, onCancel: Function}} props
 */
function ConfirmModal({
    isOpen,
    title,
    message,
    confirmLabel = "Confirmar",
    onConfirm,
    onCancel,
}) {
    // Keyboard users can close the dialog with Esc.
    useEffect(() => {
        if (!isOpen) return undefined;

        function handleKeyDown(event) {
            if (event.key === ESCAPE_KEY) onCancel();
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal d-block"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                tabIndex={-1}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title h5" id="confirm-modal-title">
                                {title}
                            </h2>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Fechar"
                                onClick={onCancel}
                            ></button>
                        </div>

                        <div className="modal-body">{message}</div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                                Voltar
                            </button>
                            {/* autoFocus moves the keyboard focus into the dialog */}
                            <button type="button" className="btn btn-danger" onClick={onConfirm} autoFocus>
                                {confirmLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-backdrop show"></div>
        </>
    );
}

export default ConfirmModal;
