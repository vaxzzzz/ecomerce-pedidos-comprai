package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.excecao.EstoqueInsuficienteException;
import com.ecommerce.pedidos.util.Validador;

public class Produto {
    private String codigo;
    private String nome;
    private String descricao;
    private double preco;
    private int quantidadeEmEstoque;
    private boolean ativo;

    public Produto() {
        this("SEM-CODIGO", "Produto sem nome", "Produto sem descricao", 0.0, 0);
    }

    public Produto(String codigo, String nome, String descricao, double preco, int estoque) {
        setCodigo(codigo);
        setNome(nome);
        setDescricao(descricao);
        setPreco(preco);
        setQuantidadeEmEstoque(estoque);
        this.ativo = true;
    }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) {
        this.codigo = Validador.textoObrigatorio(codigo, "Código");
    }

    public String getNome() { return nome; }
    public void setNome(String nome) {
        this.nome = Validador.textoObrigatorio(nome, "Nome do produto");
    }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) {
        this.descricao = Validador.textoObrigatorio(descricao, "Descrição");
    }

    public double getPreco() { return preco; }
    public void setPreco(double preco) {
        this.preco = Validador.precoNaoNegativo(preco, "Preço");
    }

    public int getQuantidadeEmEstoque() { return quantidadeEmEstoque; }
    public void setQuantidadeEmEstoque(int quantidade) {
        this.quantidadeEmEstoque =
                Validador.quantidadeNaoNegativa(quantidade, "Estoque");
    }

    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }

    public boolean temEstoqueDisponivel(int quantidadeDesejada) {
        Validador.quantidadePositiva(quantidadeDesejada, "Quantidade");
        return ativo && this.quantidadeEmEstoque >= quantidadeDesejada;
    }

    public void baixarEstoque(int quantidade) throws EstoqueInsuficienteException {
        Validador.quantidadePositiva(quantidade, "Quantidade");

        if (quantidade > quantidadeEmEstoque) {
            throw new EstoqueInsuficienteException(
                    codigo, quantidade, quantidadeEmEstoque);
        }

        this.quantidadeEmEstoque -= quantidade;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s - R$ %.2f (%d em estoque)",
                codigo, nome, preco, quantidadeEmEstoque);
    }
}
