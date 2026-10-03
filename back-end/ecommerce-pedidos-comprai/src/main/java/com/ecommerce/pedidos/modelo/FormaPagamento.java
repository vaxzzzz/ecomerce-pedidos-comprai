package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.modelo.pagamento.ProcessadorPagamento;
import java.math.BigDecimal;
import java.util.Date;

public abstract class FormaPagamento implements ProcessadorPagamento {
    private BigDecimal valor;
    private Date dataDeVencimento;

    public FormaPagamento(BigDecimal valor, Date dataDeVencimento) {
        this.valor = valor;
        this.dataDeVencimento = dataDeVencimento;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public Date getDataDeVencimento() {
        return dataDeVencimento;
    }
}
