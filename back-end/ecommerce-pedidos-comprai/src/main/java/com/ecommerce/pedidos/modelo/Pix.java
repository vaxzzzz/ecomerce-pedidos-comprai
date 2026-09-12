package com.ecommerce.pedidos.modelo;

public class Pix extends FormaPagamento {

    @Override
    public void pagar(double valor) {
        System.out.println("Pagamento via Pix: R$ " + valor);
    }
}
