import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ROUTES } from "../routes/AppRoutes";

const MENU_LINKS = [
    { to: ROUTES.HOME, label: "Início", end: true },
    { to: ROUTES.CATALOG, label: "Catálogo" },
    { to: ROUTES.ORDERS, label: "Pedidos" },
    { to: ROUTES.ADMIN_PRODUCTS, label: "Produtos" },
    { to: ROUTES.ADMIN_CLIENTS, label: "Clientes" },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalItems } = useCart();

    // On mobile the menu must close after the user picks a page.
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm" aria-label="Menu principal">
            <div className="container">
                <Link className="navbar-brand fw-bold" to={ROUTES.HOME} onClick={closeMenu}>
                    <i className="bi bi-bag-check me-2" aria-hidden="true"></i>
                    Comprai
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="menu"
                    aria-expanded={isMenuOpen}
                    aria-label="Abrir ou fechar o menu"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="menu">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {MENU_LINKS.map((link) => (
                            <li className="nav-item" key={link.to}>
                                <NavLink className="nav-link" to={link.to} end={link.end} onClick={closeMenu}>
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}

                        <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                            <Link className="btn btn-primary" to={ROUTES.CART} onClick={closeMenu}>
                                <i className="bi bi-cart me-1" aria-hidden="true"></i>
                                Carrinho
                                <span className="badge text-bg-light ms-2">
                                    {totalItems}
                                    <span className="visually-hidden"> itens no carrinho</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
