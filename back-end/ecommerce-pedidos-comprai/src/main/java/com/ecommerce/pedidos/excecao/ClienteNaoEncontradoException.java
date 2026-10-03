package com.ecommerce.pedidos.excecao;

public class ClienteNaoEncontradoException extends ECommerceException {

    private final String identificador;

    public ClienteNaoEncontradoException(String identificador) {
        super("Cliente não encontrado para o identificador '" + identificador
                + "'. Verifique o identificador e tente novamente.");
        this.identificador = identificador;
    }

    public String getIdentificador() {
        return identificador;
    }
}
