package com.ecommerce.pedidos.excecao;

public class PedidoJaPagoException extends RuntimeException {

    public PedidoJaPagoException(String numeroPedido) {
        super("O pedido " + numeroPedido
                + " já foi pago e não pode ser pago novamente.");
    }
}
