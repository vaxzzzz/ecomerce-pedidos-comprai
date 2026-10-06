package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.util.Validador;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

public class CartaoCredito extends FormaPagamento {
    private String numeroDoCartao;

    public CartaoCredito(BigDecimal valor, Date dataDeVencimento, String numeroDoCartao) {
        super(valor, dataDeVencimento);
        setNumeroDoCartao(numeroDoCartao);
    }

    public String getNumeroDoCartao() { return numeroDoCartao; }

    public void setNumeroDoCartao(String numeroDoCartao) {
        String numero = Validador.somenteNumeros(numeroDoCartao, "Número do cartão");
        if (numero.length() < 13 || numero.length() > 19) {
            throw new IllegalArgumentException(
                    "Número do cartão deve conter entre 13 e 19 dígitos.");
        }
        this.numeroDoCartao = numero;
    }

    @Override
    public boolean processar(BigDecimal valor) {
        System.out.println("Processando " + valor + " no cartão: " + numeroDoCartao);
        return true;
    }

    @Override
    public String getComprovante() {
        String ultimosDigitos = numeroDoCartao.substring(numeroDoCartao.length() - 4);
        return "Comprovante gerado com sucesso. Cartão final: " + ultimosDigitos;
    }

    @Override
    public String getDescricao() {
        return "Pagamento efetuado via Cartão de Crédito";
    }

    public BigDecimal calcularValorParcela(int quantidadeParcelas) {
        Validador.quantidadePositiva(quantidadeParcelas, "Quantidade de parcelas");
        return getValor().divide(
                new BigDecimal(quantidadeParcelas), 2, RoundingMode.HALF_UP);
    }
}
