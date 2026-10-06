package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.modelo.pagamento.ProcessadorPagamento;
import com.ecommerce.pedidos.util.Validador;
import java.math.BigDecimal;
import java.util.Date;

public abstract class FormaPagamento implements ProcessadorPagamento {
    private BigDecimal valor;
    private Date dataDeVencimento;

    public FormaPagamento(BigDecimal valor, Date dataDeVencimento) {
        this.valor = Validador.valorPositivo(valor, "Valor do pagamento");
        this.dataDeVencimento =
                Validador.dataObrigatoria(dataDeVencimento, "Data de vencimento");
    }

    public BigDecimal getValor() { return valor; }
    public Date getDataDeVencimento() { return dataDeVencimento; }
}
