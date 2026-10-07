import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { buildPath, ROUTES } from "../routes/AppRoutes";
import { getClients } from "../services/clientService";

function Clients() {
    const { data: clients, isLoading, error } = useFetch(getClients);

    if (isLoading) return <Loading message="Carregando clientes..." />;

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                    <h1 className="fw-bold">Clientes</h1>
                    <p className="text-secondary mb-0">Gerenciamento de clientes.</p>
                </div>

                <Link to={ROUTES.ADMIN_CLIENT_CREATE} className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                    Novo cliente
                </Link>
            </div>

            <AlertMessage type="danger" message={error} />

            {clients?.length === 0 && <div className="alert alert-info">Nenhum cliente cadastrado.</div>}

            {clients?.length > 0 && (
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <caption className="visually-hidden">Lista de clientes</caption>
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.city}/{client.state}</td>
                                        <td>
                                            <Link
                                                to={buildPath.clientEdit(client.id)}
                                                className="btn btn-sm btn-outline-primary"
                                                aria-label={`Editar ${client.name}`}
                                            >
                                                <i className="bi bi-pencil" aria-hidden="true"></i>
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

export default Clients;
