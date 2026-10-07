import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import QuantityStepper from "../components/QuantityStepper";
import { MIN_QUANTITY, PLACEHOLDER_IMAGE } from "../constants";
import { useCart } from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getProductById } from "../services/productService";
import { formatCurrency } from "../utils/format";

function ProductDetails() {
    const { id } = useParams();
    // useCallback keeps the same function between renders, so useFetch only reloads when `id` changes.
    const fetchProduct = useCallback(() => getProductById(id), [id]);
    const { data: product, isLoading, error } = useFetch(fetchProduct);

    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(MIN_QUANTITY);
    const [wasAdded, setWasAdded] = useState(false);

    if (isLoading) return <Loading message="Carregando produto..." />;

    if (error || !product) {
        return (
            <div className="container py-5 text-center">
                <h1>Produto não encontrado</h1>
                <Link to={ROUTES.CATALOG} className="btn btn-primary mt-3">
                    Voltar para o catálogo
                </Link>
            </div>
        );
    }

    const isOutOfStock = product.stock <= 0;

    function handleAddToCart() {
        addItem(product, quantity);
        setWasAdded(true);
    }

    return (
        <div className="container py-5">
            <Link to={ROUTES.CATALOG} className="btn btn-outline-secondary mb-4">
                <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                Voltar
            </Link>

            <div className="row g-5 align-items-center">
                <div className="col-lg-6">
                    <img
                        src={product.image || PLACEHOLDER_IMAGE}
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                        alt={`Imagem do produto ${product.name}`}
                        className="img-fluid rounded shadow"
                    />
                </div>

                <div className="col-lg-6">
                    <span className="badge bg-primary">{product.category}</span>

                    <h1 className="display-5 fw-bold mt-3">{product.name}</h1>
                    <p className="lead text-secondary">{product.description}</p>
                    <p className="display-6 fw-bold text-primary">{formatCurrency(product.price)}</p>

                    <div className={`alert ${isOutOfStock ? "alert-danger" : "alert-success"} mt-4`}>
                        <i className={`bi ${isOutOfStock ? "bi-x-circle" : "bi-check-circle"} me-2`} aria-hidden="true"></i>
                        {isOutOfStock ? "Produto sem estoque" : `${product.stock} unidades disponíveis`}
                    </div>

                    {!isOutOfStock && (
                        <div className="d-flex align-items-end gap-3 flex-wrap">
                            <div>
                                <span className="form-label d-block">Quantidade</span>
                                <QuantityStepper
                                    label={`Quantidade de ${product.name}`}
                                    value={quantity}
                                    min={MIN_QUANTITY}
                                    max={product.stock}
                                    onChange={setQuantity}
                                />
                            </div>

                            <button type="button" className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                                <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
                                Adicionar ao carrinho
                            </button>
                        </div>
                    )}

                    <div className="mt-3">
                        <AlertMessage type="success" message={wasAdded && "Produto adicionado ao carrinho."} onClose={() => setWasAdded(false)} />
                        {wasAdded && <Link to={ROUTES.CART}>Ir para o carrinho</Link>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
