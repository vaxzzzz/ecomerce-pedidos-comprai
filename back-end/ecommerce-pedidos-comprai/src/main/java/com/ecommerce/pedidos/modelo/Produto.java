
package com.ecommerce.pedidos.modelo;

public class Produto {
    private String codigo;
    private String nome;
    private String descricao;
    private double preco;
    private int quantidadeEmEstoque;
    private boolean ativo;

    public Produto() {
    }

    public Produto(String codigo, String nome, String descricao, double preco, int quantidadeEmEstoque) {
        setCodigo(codigo);
        this.nome = nome;
        this.descricao = descricao;
        setPreco(preco);
        this.quantidadeEmEstoque = quantidadeEmEstoque;
        this.ativo = true;
    }

    public String getNome() {
        return this.nome;
    }

    public boolean isAtivo() {
        return this.ativo;
    }

    public double getPreco() {
        return this.preco;
    }

    public void setCodigo(String codigo) {
        if (codigo == null || codigo.isEmpty()) {
            throw new IllegalArgumentException("O código não pode ser vazio.");
        }

        this.codigo = codigo;
    }

    public void setPreco(double preco) {
        if (preco <= 0) {
            throw new IllegalArgumentException("O preço deve ser maior que zero.");
        }

        this.preco = preco;
    }

    public boolean temEstoqueDisponivel(int quantidadeDesejada) {
        return ativo && quantidadeEmEstoque >= quantidadeDesejada;
    }

    @Override
    public String toString() {
        return String.format(
                "[%-10s] %-15s R$ %9.2f (%6d em estoque)",
                codigo,
                nome,
                preco,
                quantidadeEmEstoque);
    }

    public void baixarEstoque(int quantidade) {
        if (quantidade > quantidadeEmEstoque) {
            throw new IllegalArgumentException(
                    "Estoque insuficiente. Estoque disponível: " + quantidadeEmEstoque);
        }

        this.quantidadeEmEstoque = quantidadeEmEstoque - quantidade;
    }
}
