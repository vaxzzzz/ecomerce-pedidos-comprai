import { useState } from "react";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import ConfirmModal from "../components/ConfirmModal";
import Loading from "../components/Loading";
import { useFetch } from "../hooks/useFetch";
import { buildPath, ROUTES } from "../routes/AppRoutes";
import { getErrorMessage } from "../services/api";
import { deleteProduct, getProducts } from "../services/productService";
import { formatCurrency } from "../utils/format";

function ProductAdmin() {
    const { data: products, setData: setProducts, isLoading, error } = useFetch(getProducts);

    const [productToDelete, setProductToDelete] = useState(null);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    if (isLoading) return <Loading message="Carregando produtos..." />;

    async function handleConfirmDelete() {
        const { id, name } = productToDelete;
        setProductToDelete(null);

        try {
            await deleteProduct(id);
            // Removes it from the screen without asking the API for the whole list again.
            setProducts(products.filter((product) => product.id !== id));
            setFeedback({ type: "success", message: `Produto "${name}" excluído com sucesso.` });
        } catch (requestError) {
            setFeedback({ type: "danger", message: getErrorMessage(requestError) });
        }
    }

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                    <h1 className="fw-bold">Produtos</h1>
                    <p className="text-secondary mb-0">Gerenciamento de produtos.</p>
                </div>

                <Link to={ROUTES.ADMIN_PRODUCT_CREATE} className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2" aria-hidden="true"></i>
                    Novo produto
                </Link>
            </div>

            <AlertMessage type="danger" message={error} />
            <AlertMessage
                type={feedback.type}
                message={feedback.message}
                onClose={() => setFeedback({ type: "", message: "" })}
            />

            <div className="card border-0 shadow-sm">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <caption className="visually-hidden">Lista de produtos</caption>
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Produto</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Preço</th>
                                <th scope="col">Estoque</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {(products ?? []).map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{formatCurrency(product.price)}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link
                                            to={buildPath.productEdit(product.id)}
                                            className="btn btn-sm btn-outline-primary me-2"
                                            aria-label={`Editar ${product.name}`}
                                        >
                                            <i className="bi bi-pencil" aria-hidden="true"></i>
                                        </Link>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            aria-label={`Excluir ${product.name}`}
                                            onClick={() => setProductToDelete(product)}
                                        >
                                            <i className="bi bi-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmModal
                isOpen={Boolean(productToDelete)}
                title="Excluir produto"
                message={`Tem certeza que deseja excluir "${productToDelete?.name}"? Essa ação não pode ser desfeita.`}
                confirmLabel="Excluir"
                onConfirm={handleConfirmDelete}
                onCancel={() => setProductToDelete(null)}
            />
        </div>
    );
}

export default ProductAdmin;
