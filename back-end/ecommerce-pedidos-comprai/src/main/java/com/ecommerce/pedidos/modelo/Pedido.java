package com.ecommerce.pedidos.modelo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Pedido {

    private Cliente cliente;

    private List<ItemPedido> itens = new ArrayList<>();

    private SituacaoDoPedido situacao = SituacaoDoPedido.ABERTO;

    private FormaPagamento formaPagamento;

    public Pedido(Cliente cliente) {
        if (cliente == null) {
            throw new IllegalArgumentException("Cliente é obrigatório");
        }

        this.cliente = cliente;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public List<ItemPedido> getItens() {
        return Collections.unmodifiableList(itens);
    }

    public SituacaoDoPedido getSituacao() {
        return situacao;
    }

    public void adicionarItem(ItemPedido item) {
        if (item == null) {
            throw new IllegalArgumentException("Item é obrigatório");
        }

        itens.add(item);
    }

    public void removerItem(ItemPedido item) {
        itens.remove(item);
    }

    public double calcularTotal() {
        double total = 0;

        for (ItemPedido item : itens) {
            total += item.calcularSubtotal();
        }

        return total;
    }

    public void definirFormaPagamento(FormaPagamento formaPagamento) {
        if (formaPagamento == null) {
            throw new IllegalArgumentException(
                "Forma de pagamento é obrigatória"
            );
        }

        this.formaPagamento = formaPagamento;
    }

    public void pagar() {
        if (formaPagamento == null) {
            throw new IllegalStateException(
                "Defina uma forma de pagamento"
            );
        }

        formaPagamento.pagar(calcularTotal());
        situacao = SituacaoDoPedido.PAGO;
    }

    public void cancelar() {
        if (situacao == SituacaoDoPedido.ENTREGUE) {
            throw new IllegalStateException(
                "Pedido entregue não pode ser cancelado"
            );
        }

        situacao = SituacaoDoPedido.CANCELADO;
    }
}
