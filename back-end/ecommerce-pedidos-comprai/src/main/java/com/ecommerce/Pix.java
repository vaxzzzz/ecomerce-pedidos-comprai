package com.ecommerce.pedidos.modelo;

public class Pix extends FormaPagamento implements ProcessadorPagamento {
    private final String chave;

    public Pix(String chave) {
        super(valor, dataDeVencimento);
        this.chave = chave;
    }

    @Override
    public boolean processar(BigDecimal valor) {
        System.out.println("Enviando cobrança Pix para a chave " + chave);
        return true;
    }

    @Override
    public String getComprovante() {
        return "PIX-" + System.currentTimeMillis();
    }

    @Override
    public String getDescricao() {
        return "Pix - chave " + chave;
    }

    public String gerarCodigoCopiaECola() {
        String identificadorUnico = String.valueOf(System.currentTimeMillis());
        return "00020126580014br.gov.bcb.pix0136" + chave + "5204000053039865802BR5910ECommerce6008SaoPaulo62070503" + identificadorUnico;
    }
}