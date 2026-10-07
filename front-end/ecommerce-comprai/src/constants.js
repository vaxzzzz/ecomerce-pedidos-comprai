// Central place for every fixed value used by the app.
// Keeping them here avoids "magic" numbers/strings spread across the files.

// ---------- API ----------
// The real back-end can be plugged in by setting VITE_API_URL (e.g. http://localhost:8080/api).
export const API_BASE_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:3001";
export const API_TIMEOUT_MS = 8000;

export const ENDPOINTS = {
    PRODUCTS: "/produtos",
    CLIENTS: "/clientes",
    ORDERS: "/pedidos",
    PAYMENTS: "/pagamentos",
};

// ---------- Cart ----------
export const CART_STORAGE_KEY = "comprai:cart";
export const MIN_QUANTITY = 1;

// ---------- Orders ----------
export const ORDER_STATUS = {
    PENDING: "pendente",
    PAID: "pago",
    SHIPPED: "enviado",
    DELIVERED: "entregue",
    CANCELED: "cancelado",
};

export const ORDER_STATUS_LABEL = {
    [ORDER_STATUS.PENDING]: "Pendente",
    [ORDER_STATUS.PAID]: "Pago",
    [ORDER_STATUS.SHIPPED]: "Enviado",
    [ORDER_STATUS.DELIVERED]: "Entregue",
    [ORDER_STATUS.CANCELED]: "Cancelado",
};

// Bootstrap color used by the status badge.
export const ORDER_STATUS_COLOR = {
    [ORDER_STATUS.PENDING]: "warning",
    [ORDER_STATUS.PAID]: "info",
    [ORDER_STATUS.SHIPPED]: "primary",
    [ORDER_STATUS.DELIVERED]: "success",
    [ORDER_STATUS.CANCELED]: "danger",
};

// Normal life of an order, in order. "canceled" is outside this flow.
export const ORDER_STATUS_FLOW = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PAID,
    ORDER_STATUS.SHIPPED,
    ORDER_STATUS.DELIVERED,
];

// ---------- Payment ----------
export const PAYMENT_METHOD = {
    CARD: "cartao",
    PIX: "pix",
    BOLETO: "boleto",
};

export const PAYMENT_METHOD_LABEL = {
    [PAYMENT_METHOD.CARD]: "Cartão de crédito",
    [PAYMENT_METHOD.PIX]: "Pix",
    [PAYMENT_METHOD.BOLETO]: "Boleto bancário",
};

export const PAYMENT_RESULT = {
    APPROVED: "aprovado",
    DECLINED: "recusado",
    PENDING: "pendente",
};

// What happens to the order after each simulated payment result.
export const ORDER_STATUS_BY_PAYMENT_RESULT = {
    [PAYMENT_RESULT.APPROVED]: ORDER_STATUS.PAID,
    [PAYMENT_RESULT.PENDING]: ORDER_STATUS.PENDING,
    [PAYMENT_RESULT.DECLINED]: ORDER_STATUS.CANCELED,
};

// Simulation rule: cards are approved most of the time, Pix is instant,
// boleto stays pending until the customer pays it.
export const CARD_APPROVAL_RATE = 0.8;
export const PAYMENT_SIMULATION_DELAY_MS = 800;

// ---------- Catalog ----------
export const PRICE_RANGES = [
    { id: "all", label: "Qualquer preço", min: 0, max: Infinity },
    { id: "low", label: "Até R$ 200", min: 0, max: 200 },
    { id: "medium", label: "R$ 200 a R$ 1.000", min: 200, max: 1000 },
    { id: "high", label: "Acima de R$ 1.000", min: 1000, max: Infinity },
];

export const SUGGESTED_CATEGORIES = ["Eletrônicos", "Periféricos", "Acessórios"];

// Simple gray image shown when a product image fails to load.
export const PLACEHOLDER_IMAGE =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
            '<rect width="100%" height="100%" fill="#e9ecef"/>' +
            '<text x="50%" y="50%" fill="#6c757d" font-family="Arial" font-size="24" ' +
            'text-anchor="middle" dominant-baseline="middle">Sem imagem</text></svg>'
    );

// ---------- Validation ----------
export const CPF_LENGTH = 11;
export const ZIP_CODE_LENGTH = 8;
export const PHONE_MIN_LENGTH = 10; // landline: DDD + 8 digits
export const PHONE_MAX_LENGTH = 11; // mobile: DDD + 9 digits
export const MIN_NAME_LENGTH = 3;
