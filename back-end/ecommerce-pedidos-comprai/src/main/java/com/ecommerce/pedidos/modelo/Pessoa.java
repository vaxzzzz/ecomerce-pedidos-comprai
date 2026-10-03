package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.util.Validador;

public abstract class Pessoa {

    private String nome;
    private String documento;

    public Pessoa(String nome, String documento) {
        setNome(nome);
        setDocumento(documento);
    }

    public void setNome(String nome) {
        this.nome = Validador.textoObrigatorio(nome, "Nome");
    }

    public void setDocumento(String documento) {
        this.documento = Validador.somenteNumeros(documento, "Documento");
    }

    public String getNome() { return nome; }
    public String getDocumento() { return documento; }

    public abstract String getIdentificacao();
}
