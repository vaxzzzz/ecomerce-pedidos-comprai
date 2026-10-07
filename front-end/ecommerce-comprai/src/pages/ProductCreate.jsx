import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import ProductForm from "../components/ProductForm";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { createProduct } from "../services/productService";

function ProductCreate() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(product) {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await createProduct(product);
            navigate(ROUTES.ADMIN_PRODUCTS);
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.ADMIN_PRODUCTS} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <h1 className="fw-bold mb-4">Novo produto</h1>

            <AlertMessage type="danger" message={errorMessage} />

            <div className="card border-0 shadow-sm p-4">
                <ProductForm submitLabel="Cadastrar produto" isSubmitting={isSubmitting} onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default ProductCreate;
