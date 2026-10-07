import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Checkout from "./pages/Checkout";
import ClientCreate from "./pages/ClientCreate";
import ClientEdit from "./pages/ClientEdit";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import NotFound from "./pages/NotFoudn"; // file name keeps the original spelling
import OrderDetails from "./pages/OrdersDetails"; // file name keeps the original spelling
import Orders from "./pages/Orders";
import PaymentResult from "./pages/PaymentResult";
import ProductAdmin from "./pages/ProductAdmin";
import ProductCreate from "./pages/ProductCreate";
import ProductDetails from "./pages/ProductDetails";
import ProductEdit from "./pages/ProductEdit";

import { ROUTES } from "./routes/AppRoutes";

const MAIN_CONTENT_ID = "main-content";

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Lets keyboard users jump the menu (accessibility) */}
            <a className="skip-link" href={`#${MAIN_CONTENT_ID}`}>
                Pular para o conteúdo
            </a>

            <Navbar />

            <main id={MAIN_CONTENT_ID} className="flex-grow-1" tabIndex={-1}>
                <Routes>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.CATALOG} element={<Catalog />} />
                    <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
                    <Route path={ROUTES.CART} element={<Cart />} />
                    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                    <Route path={ROUTES.PAYMENT_RESULT} element={<PaymentResult />} />
                    <Route path={ROUTES.ORDERS} element={<Orders />} />
                    <Route path={ROUTES.ORDER_DETAILS} element={<OrderDetails />} />

                    <Route path={ROUTES.ADMIN_PRODUCTS} element={<ProductAdmin />} />
                    <Route path={ROUTES.ADMIN_PRODUCT_CREATE} element={<ProductCreate />} />
                    <Route path={ROUTES.ADMIN_PRODUCT_EDIT} element={<ProductEdit />} />

                    <Route path={ROUTES.ADMIN_CLIENTS} element={<Clients />} />
                    <Route path={ROUTES.ADMIN_CLIENT_CREATE} element={<ClientCreate />} />
                    <Route path={ROUTES.ADMIN_CLIENT_EDIT} element={<ClientEdit />} />

                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
