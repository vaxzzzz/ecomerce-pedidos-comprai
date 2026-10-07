/**
 * Spinner shown while data is being loaded.
 * @param {{message?: string}} props
 */
function Loading({ message = "Carregando..." }) {
    return (
        <div className="text-center py-5" role="status">
            <div className="spinner-border text-primary" aria-hidden="true"></div>
            <p className="mt-3 text-secondary">{message}</p>
        </div>
    );
}

export default Loading;
