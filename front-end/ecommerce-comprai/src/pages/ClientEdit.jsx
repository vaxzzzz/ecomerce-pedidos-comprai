import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import ClientForm from "../components/ClientForm";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { getClientById, updateClient } from "../services/clientService";

function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fetchClient = useCallback(() => getClientById(id), [id]);
    const { data: client, isLoading, error } = useFetch(fetchClient);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (isLoading) return <Loading message="Carregando cliente..." />;

    if (error || !client) {
        return (
            <div className="container py-5">
                <AlertMessage type="danger" message={error || "Cliente não encontrado."} />
                <Link to={ROUTES.ADMIN_CLIENTS}>Voltar para clientes</Link>
            </div>
        );
    }

    async function handleSubmit(updatedClient) {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await updateClient(id, { ...updatedClient, id: client.id });
            navigate(ROUTES.ADMIN_CLIENTS);
        } catch (requestError) {
            setErrorMessage(getErrorMessage(requestError));
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.ADMIN_CLIENTS} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <h1 className="fw-bold mb-4">Editar cliente</h1>

            <AlertMessage type="danger" message={errorMessage} />

            <div className="card border-0 shadow-sm p-4">
                <ClientForm
                    initialValues={client}
                    submitLabel="Salvar alterações"
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ClientEdit;
