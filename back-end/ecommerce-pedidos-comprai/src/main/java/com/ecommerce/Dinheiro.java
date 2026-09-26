package com.ecommerce.pedidos.modelo;

import java.math.BigDecimal;

public class Dinheiro implements ProcessadorPagamento {
    private final BigDecimal valorRecebido;

    public Dinheiro (BigDecimal valorRecebido) {
        super(valor, dataDeVencimento);
        this.valorRecebido = valorRecebido;
    }

    @Override
    public boolean processar(BigDecimal valor) {
        return valorRecebido.compareTo(valor) >= 0;
    }

    @Override
    public String getComprovante() {
        return "RECIBO-" + System.currentTimeMillis();
    }

    @Override
    public String getDescricao() {
        return "Dinheiro";
    }

    public BigDecimal calcularTroco(BigDecimal valorDaCompra) {
        BigDecimal troco = valorRecebido.subtract(valorDaCompra);
        

        if (troco.compareTo(BigDecimal.ZERO) < 0) {
            return BigDecimal.ZERO; 
        }
        
        return troco;
    }
}