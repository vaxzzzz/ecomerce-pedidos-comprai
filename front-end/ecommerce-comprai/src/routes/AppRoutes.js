// All URL paths of the app in one place.
// Used by <Route path=...> (patterns) and by links/navigation (builders),
// so renaming a URL only needs a change here.

export const ROUTES = {
    HOME: "/",
    CATALOG: "/catalogo",
    PRODUCT_DETAILS: "/produto/:id",
    CART: "/carrinho",
    CHECKOUT: "/checkout",
    PAYMENT_RESULT: "/resultado-pagamento",
    ORDERS: "/pedidos",
    ORDER_DETAILS: "/pedido/:id",
    ADMIN_PRODUCTS: "/admin/produtos",
    ADMIN_PRODUCT_CREATE: "/admin/produtos/novo",
    ADMIN_PRODUCT_EDIT: "/admin/produtos/:id/editar",
    ADMIN_CLIENTS: "/admin/clientes",
    ADMIN_CLIENT_CREATE: "/admin/clientes/novo",
    ADMIN_CLIENT_EDIT: "/admin/clientes/:id/editar",
    NOT_FOUND: "*",
};

// Builders for the paths that have an :id.
export const buildPath = {
    productDetails: (id) => `/produto/${id}`,
    orderDetails: (id) => `/pedido/${id}`,
    productEdit: (id) => `/admin/produtos/${id}/editar`,
    clientEdit: (id) => `/admin/clientes/${id}/editar`,
};
