package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.util.Validador;

public class ItemPedido {
    private Produto produto;
    private int quantidade;
    private double precoPraticado;

    public ItemPedido(Produto produto, int quantidade, double precoPraticado) {
        setProduto(produto);
        setQuantidade(quantidade);
        setPrecoPraticado(precoPraticado);
    }

    public Produto getProduto() { return produto; }

    public void setProduto(Produto produto) {
        this.produto = Validador.naoNulo(produto, "Produto");
    }

    public int getQuantidade() { return quantidade; }

    public void setQuantidade(int quantidade) {
        this.quantidade = Validador.quantidadePositiva(quantidade, "Quantidade");
    }

    public double getPrecoPraticado() { return precoPraticado; }

    public void setPrecoPraticado(double precoPraticado) {
        this.precoPraticado =
                Validador.precoNaoNegativo(precoPraticado, "Preço praticado");
    }

    public double calcularSubtotal() {
        return precoPraticado * quantidade;
    }
}
