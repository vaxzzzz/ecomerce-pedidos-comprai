import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import ClientForm from "../components/ClientForm";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { createClient } from "../services/clientService";

function ClientCreate() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(client) {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await createClient(client);
            navigate(ROUTES.ADMIN_CLIENTS);
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.ADMIN_CLIENTS} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <h1 className="fw-bold mb-4">Novo cliente</h1>

            <AlertMessage type="danger" message={errorMessage} />

            <div className="card border-0 shadow-sm p-4">
                <ClientForm submitLabel="Cadastrar cliente" isSubmitting={isSubmitting} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default ClientCreate;
