package com.ecommerce.pedidos.modelo;
public class Produto {
    private String codigo;
    private String nome;
    private String descricao;
    private double preco;
    private int quantidadeEmEstoque;
    private boolean ativo;

    public Produto(){}

    public Produto(String codigo, String nome, String descricao, double preco, int quantidadeEmEstoque){
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeEmEstoque = quantidadeEmEstoque;
        this.ativo = true;
    }

    public String getNome(){
        return this.nome;
    }

    public boolean isAtivo(){
        return this.ativo;
    }
    public boolean temEstoqueDisponivel(int quantidadeDesejada){
        return ativo && quantidadeEmEstoque >= quantidadeDesejada;
    }

    @Override
    public String toString(){
        return String.format("[%-10s] %-15s R$ %9.2f (%6d em estoque)", codigo, nome, preco, quantidadeEmEstoque);
    }

    public void baixarEstoque(int quantidade){
        this.quantidadeEmEstoque = quantidadeEmEstoque -= quantidade;
    }
}