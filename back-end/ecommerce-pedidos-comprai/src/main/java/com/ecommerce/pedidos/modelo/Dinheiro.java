package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.modelo.pagamento.ProcessadorPagamento;
import com.ecommerce.pedidos.util.Validador;
import java.math.BigDecimal;

public class Dinheiro implements ProcessadorPagamento {
    private final BigDecimal valorRecebido;

    public Dinheiro(BigDecimal valorRecebido) {
        this.valorRecebido =
                Validador.valorPositivo(valorRecebido, "Valor recebido");
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
        Validador.valorPositivo(valorDaCompra, "Valor da compra");
        BigDecimal troco = valorRecebido.subtract(valorDaCompra);
        return troco.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : troco;
    }
}
