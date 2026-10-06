package com.ecommerce.pedidos.excecao;

/**
 * Raiz das exceções de negócio do e-commerce.
 *
 * Critério adotado:
 * - Checked: quando a camada chamadora consegue reagir de forma útil
 *   ao problema de negócio.
 * - Unchecked: quando o problema representa estado/entrada inválida
 *   que deve ser corrigido antes da chamada.
 */
public class ECommerceException extends Exception {

    public ECommerceException(String mensagem) {
        super(mensagem);
    }

    public ECommerceException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }
}
