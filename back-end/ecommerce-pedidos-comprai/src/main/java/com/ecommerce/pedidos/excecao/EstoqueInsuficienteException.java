package com.ecommerce.pedidos.excecao;

public class EstoqueInsuficienteException extends ECommerceException {

    private final String codigoProduto;
    private final int quantidadeSolicitada;
    private final int estoqueDisponivel;

    public EstoqueInsuficienteException(
            String codigoProduto,
            int quantidadeSolicitada,
            int estoqueDisponivel) {

        super(String.format(
                "Estoque insuficiente para o produto %s. "
                        + "Foram solicitadas %d unidade(s), mas há apenas %d disponível(is). "
                        + "Reduza a quantidade e tente novamente.",
                codigoProduto, quantidadeSolicitada, estoqueDisponivel));

        this.codigoProduto = codigoProduto;
        this.quantidadeSolicitada = quantidadeSolicitada;
        this.estoqueDisponivel = estoqueDisponivel;
    }

    public String getCodigoProduto() {
        return codigoProduto;
    }

    public int getQuantidadeSolicitada() {
        return quantidadeSolicitada;
    }

    public int getEstoqueDisponivel() {
        return estoqueDisponivel;
    }
}
