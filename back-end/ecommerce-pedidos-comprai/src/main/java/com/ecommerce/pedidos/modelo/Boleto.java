package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.util.Validador;
import java.math.BigDecimal;
import java.util.Date;

public class Boleto extends FormaPagamento {
    private String codigoDeBarras;

    public Boleto(BigDecimal valor, Date dataDeVencimento, String codigoDeBarras) {
        super(valor, dataDeVencimento);
        setCodigoDeBarras(codigoDeBarras);
    }

    public String getCodigoDeBarras() { return codigoDeBarras; }

    public void setCodigoDeBarras(String codigoDeBarras) {
        this.codigoDeBarras =
                Validador.somenteNumeros(codigoDeBarras, "Código de barras");
    }

    public boolean isVencido() {
        return new Date().after(getDataDeVencimento());
    }

    @Override
    public boolean processar(BigDecimal valor) {
        if (isVencido()) {
            System.out.println("Pagamento recusado: o boleto está vencido.");
            return false;
        }
        System.out.println(
                "Processando pagamento via boleto. Código de barras: "
                        + codigoDeBarras);
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
