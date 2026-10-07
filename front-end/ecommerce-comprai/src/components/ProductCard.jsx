import { Link } from "react-router-dom";
import { PLACEHOLDER_IMAGE } from "../constants";
import { buildPath } from "../routes/AppRoutes";
import { formatCurrency } from "../utils/format";

/**
 * Product card used in the catalog grid.
 * @param {{product: object, onAddToCart: (product: object) => void}} props
 */
function ProductCard({ product, onAddToCart }) {
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="col-sm-6 col-lg-3">
            <div className="card product-card h-100 border-0 shadow-sm">
                <img
                    src={product.image || PLACEHOLDER_IMAGE}
                    onError={(event) => {
                        // Broken link: show the placeholder (and avoid an infinite loop).
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                    className="card-img-top product-image"
                    alt={`Imagem do produto ${product.name}`}
                />

                <div className="card-body d-flex flex-column">
                    <span className="badge bg-light text-dark align-self-start mb-2">
                        {product.category}
                    </span>

                    <h2 className="h5 fw-bold">{product.name}</h2>

                    <p className="text-secondary small">{product.description}</p>

                    <div className="mt-auto">
                        <p className="fs-4 fw-bold text-primary mb-2">{formatCurrency(product.price)}</p>

                        <p className="small text-secondary">
                            <i className="bi bi-box-seam me-1" aria-hidden="true"></i>
                            {isOutOfStock ? "Sem estoque" : `${product.stock} em estoque`}
                        </p>

                        <Link to={buildPath.productDetails(product.id)} className="btn btn-outline-primary w-100 mb-2">
                            Ver produto
                        </Link>

                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            disabled={isOutOfStock}
                            onClick={() => onAddToCart(product)}
                        >
                            <i className="bi bi-cart-plus me-2" aria-hidden="true"></i>
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
