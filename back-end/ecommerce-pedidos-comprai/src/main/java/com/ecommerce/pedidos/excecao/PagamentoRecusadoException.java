package com.ecommerce.pedidos.excecao;

import java.math.BigDecimal;

public class PagamentoRecusadoException extends ECommerceException {

    private final String formaPagamento;
    private final BigDecimal valor;

    public PagamentoRecusadoException(String formaPagamento, BigDecimal valor) {
        this(formaPagamento, valor, null);
    }

    public PagamentoRecusadoException(
            String formaPagamento,
            BigDecimal valor,
            Throwable causa) {

        super(String.format(
                "Pagamento recusado para %s no valor de R$ %s. "
                        + "Verifique os dados ou escolha outra forma de pagamento.",
                formaPagamento, valor), causa);

        this.formaPagamento = formaPagamento;
        this.valor = valor;
    }

    public String getFormaPagamento() { return formaPagamento; }
    public BigDecimal getValor() { return valor; }
}
