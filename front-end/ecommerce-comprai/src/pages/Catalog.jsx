import { useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { PRICE_RANGES } from "../constants";
import { useCart } from "../hooks/useCart";
import { useFetch } from "../hooks/useFetch";
import { ROUTES } from "../routes/AppRoutes";
import { getProducts } from "../services/productService";

/**
 * @param {object} product
 * @param {{search: string, category: string, priceRangeId: string}} filters
 * @returns {boolean} True when the product matches every filter.
 */
function matchesFilters(product, { search, category, priceRangeId }) {
    const priceRange = PRICE_RANGES.find((range) => range.id === priceRangeId);

    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "" || product.category === category;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPrice;
}

function Catalog() {
    const { data: products, isLoading, error } = useFetch(getProducts);
    const { addItem } = useCart();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [priceRangeId, setPriceRangeId] = useState(PRICE_RANGES[0].id);
    const [addedName, setAddedName] = useState("");

    function handleAddToCart(product) {
        addItem(product);
        setAddedName(product.name);
    }

    if (isLoading) return <Loading message="Carregando produtos..." />;

    if (error) {
        return (
            <div className="container py-5">
                <AlertMessage type="danger" message={error} />
            </div>
        );
    }

    const categories = [...new Set(products.map((product) => product.category))];
    const filteredProducts = products.filter((product) =>
        matchesFilters(product, { search, category, priceRangeId })
    );

    return (
        <div className="container py-5">
            <div className="mb-4">
                <h1 className="fw-bold">Catálogo</h1>
                <p className="text-secondary">Encontre o produto que você procura.</p>
            </div>

            <AlertMessage
                type="success"
                message={addedName && `"${addedName}" foi adicionado ao carrinho.`}
                onClose={() => setAddedName("")}
            />
            {addedName && (
                <p>
                    <Link to={ROUTES.CART}>Ir para o carrinho</Link>
                </p>
            )}

            <div className="row g-3 mb-5">
                <div className="col-md-5">
                    <label htmlFor="search" className="form-label">Buscar produto</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search" aria-hidden="true"></i>
                        </span>
                        <input
                            id="search"
                            type="search"
                            className="form-control"
                            placeholder="Digite o nome do produto..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="category" className="form-label">Categoria</label>
                    <select
                        id="category"
                        className="form-select"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="">Todas</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="price-range" className="form-label">Faixa de preço</label>
                    <select
                        id="price-range"
                        className="form-select"
                        value={priceRangeId}
                        onChange={(event) => setPriceRangeId(event.target.value)}
                    >
                        {PRICE_RANGES.map((range) => (
                            <option key={range.id} value={range.id}>{range.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row g-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-5">
                    <i className="bi bi-search display-4" aria-hidden="true"></i>
                    <h2 className="h4 mt-3">Nenhum produto encontrado</h2>
                    <p className="text-secondary">Tente alterar os filtros.</p>
                </div>
            )}
        </div>
    );
}

export default Catalog;
