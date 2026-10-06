package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.util.Validador;

public class Cliente extends Pessoa {
    private String email;
    private String telefone;
    private Endereco endereco;

    public Cliente(String nome, String cpf, String email, Endereco endereco, String telefone) {
        super(nome, cpf);
        setEmail(email);
        setTelefone(telefone);
        setEndereco(endereco);
    }

    public String getEmail() { return email; }

    public void setEmail(String email) {
        this.email = Validador.email(email);
    }

    public String getTelefone() { return telefone; }

    public void setTelefone(String telefone) {
        this.telefone = Validador.textoObrigatorio(telefone, "Telefone");
    }

    public Endereco getEndereco() { return endereco; }

    public void setEndereco(Endereco endereco) {
        this.endereco = Validador.naoNulo(endereco, "Endereço");
    }

    @Override
    public String getIdentificacao() {
        return getNome() + " (CPF " + getDocumento() + ")";
    }
}
