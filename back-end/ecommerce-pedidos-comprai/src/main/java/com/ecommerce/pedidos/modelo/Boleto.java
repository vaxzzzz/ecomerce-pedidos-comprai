package com.ecommerce.pedidos.modelo;

import java.math.BigDecimal;
import java.util.Date;

public class Boleto extends FormaPagamento {
    private String codigoDeBarras;

    public Boleto(BigDecimal valor, Date dataDeVencimento, String codigoDeBarras) {
        super(valor, dataDeVencimento);
        setCodigoDeBarras(codigoDeBarras);
    }

    public String getCodigoDeBarras() {
        return codigoDeBarras;
    }

    public void setCodigoDeBarras(String codigoDeBarras) {
        this.codigoDeBarras = codigoDeBarras;
    }

    public boolean isVencido() {
        Date hoje = new Date();
        return hoje.after(getDataDeVencimento());
    }

    @Override
    public boolean processar(BigDecimal valor) {
        if (isVencido()) {
            System.out.println("Pagamento recusado: O boleto já está vencido.");
            return false;
        }

        System.out.println("Processando pagamento via boleto. Código de barras: " + codigoDeBarras);
        return true;
    }

    @Override
    public String getComprovante() {
        return "COMPROVANTE-BOLETO-" + System.currentTimeMillis();
    }

    @Override
    public String getDescricao() {
        return "Pagamento efetuado via Boleto Bancário";
    }
}
