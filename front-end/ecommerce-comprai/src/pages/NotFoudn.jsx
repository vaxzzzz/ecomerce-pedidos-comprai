import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container py-5 text-center">

            <h1 className="display-1 fw-bold">
                404
            </h1>

            <h2>
                Página não encontrada
            </h2>

            <p className="text-secondary">
                A página que você tentou acessar não existe.
            </p>

            <Link
                to="/"
                className="btn btn-primary"
            >
                Voltar para o início
            </Link>

        </div>
    );
}

export default NotFound;