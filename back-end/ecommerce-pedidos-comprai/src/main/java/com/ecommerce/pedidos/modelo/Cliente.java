package com.ecommerce.pedidos.modelo;

public class Cliente extends Pessoa {

    private String email;
    private String telefone;

    public Cliente(String nome, String cpf, String email) {
        super(nome, cpf);
        setEmail(email);
        setTelefone(telefone);
    }
    @Override
    public String getIdentificacao() {
        return getNome() + " (CPF " + getDocumento() + ")";
    }

    public void setEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("E-mail é obrigatório");
        }

        if (!email.contains("@")) {
            throw new IllegalArgumentException("E-mail deve conter @");
        }

        this.email = email.trim();
    }


    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    
}