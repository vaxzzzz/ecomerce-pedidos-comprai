import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import ProductForm from "../components/ProductForm";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { getProductById, updateProduct } from "../services/productService";

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fetchProduct = useCallback(() => getProductById(id), [id]);
    const { data: product, isLoading, error } = useFetch(fetchProduct);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (isLoading) return <Loading message="Carregando produto..." />;

    if (error || !product) {
        return (
            <div className="container py-5">
                <AlertMessage type="danger" message={error || "Produto não encontrado."} />
                <Link to={ROUTES.ADMIN_PRODUCTS}>Voltar para produtos</Link>
            </div>
        );
    }

    async function handleSubmit(updatedProduct) {
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            await updateProduct(id, { ...updatedProduct, id: product.id });
            navigate(ROUTES.ADMIN_PRODUCTS);
        } catch (requestError) {
            setErrorMessage(getErrorMessage(requestError));
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.ADMIN_PRODUCTS} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <h1 className="fw-bold mb-4">Editar produto</h1>

            <AlertMessage type="danger" message={errorMessage} />

            <div className="card border-0 shadow-sm p-4">
                {/* The form only reads `initialValues` once; the product is already loaded here. */}
                <ProductForm
                    initialValues={{ ...product, price: String(product.price), stock: String(product.stock) }}
                    submitLabel="Salvar alterações"
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ProductEdit;
