import { Link } from "react-router-dom";
import { ROUTES } from "../routes/AppRoutes";

const FEATURES = [
    { icon: "bi-grid", title: "Catálogo", text: "Busque produtos por nome, categoria e faixa de preço." },
    { icon: "bi-cart-check", title: "Carrinho e checkout", text: "Monte seu carrinho e finalize com pagamento simulado." },
    { icon: "bi-truck", title: "Acompanhe pedidos", text: "Veja o status de cada pedido em uma linha do tempo." },
];

function Home() {
    return (
        <div>
            <section className="hero-section py-5">
                <div className="container py-4 text-center">
                    <h1 className="display-4 fw-bold">Comprai</h1>
                    <p className="lead text-secondary">Bem-vindo ao sistema de gestão de pedidos.</p>
                    <Link to={ROUTES.CATALOG} className="btn btn-primary btn-lg">
                        Ver catálogo
                    </Link>
                </div>
            </section>

            <section className="container py-5">
                <div className="row g-4">
                    {FEATURES.map((feature) => (
                        <div className="col-md-4" key={feature.title}>
                            <div className="card feature-card h-100 border-0 shadow-sm text-center p-3">
                                <i className={`bi ${feature.icon} display-5 text-primary`} aria-hidden="true"></i>
                                <h2 className="h5 mt-3">{feature.title}</h2>
                                <p className="text-secondary mb-0">{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
