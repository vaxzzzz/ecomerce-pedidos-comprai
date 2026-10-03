package com.ecommerce.pedidos.comprai;

import com.ecommerce.pedidos.excecao.ECommerceException;
import com.ecommerce.pedidos.modelo.Produto;

/**
 * Pequeno ponto de entrada do pacote principal.
 */
public class App {
    public static void main(String[] args) {
        Produto produto = new Produto(
                "COD001", "MouseTek", "Mouse gamer", 300.00, 50);

        System.out.println(produto);

        try {
            produto.baixarEstoque(15);
            System.out.println(produto);
        } catch (ECommerceException | IllegalArgumentException e) {
            System.out.println("Não foi possível atualizar o estoque: " + e.getMessage());
        }
    }
}
