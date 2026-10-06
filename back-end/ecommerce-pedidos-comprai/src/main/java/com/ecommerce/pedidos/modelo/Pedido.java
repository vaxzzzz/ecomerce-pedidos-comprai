package com.ecommerce.pedidos.modelo;

import com.ecommerce.pedidos.excecao.ECommerceException;
import com.ecommerce.pedidos.excecao.EstoqueInsuficienteException;
import com.ecommerce.pedidos.excecao.PagamentoRecusadoException;
import com.ecommerce.pedidos.excecao.PedidoJaPagoException;
import com.ecommerce.pedidos.modelo.pagamento.ProcessadorPagamento;
import com.ecommerce.pedidos.util.Validador;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Pedido {

    private final String numero;
    private final Cliente cliente;
    private final List<ItemPedido> itens = new ArrayList<>();
    private ProcessadorPagamento formaPagamento;
    private SituacaoDoPedido situacao = SituacaoDoPedido.ABERTO;
    private String comprovante;

    public Pedido(String numero, Cliente cliente) {
        this.numero = Validador.textoObrigatorio(numero, "Número do pedido");
        this.cliente = Validador.naoNulo(cliente, "Cliente");
    }

    public void adicionarItem(Produto produto, int quantidade)
            throws EstoqueInsuficienteException {

        Validador.naoNulo(produto, "Produto");
        Validador.quantidadePositiva(quantidade, "Quantidade");

        if (!produto.isAtivo()) {
            throw new IllegalStateException(
                    "O produto " + produto.getNome()
                            + " está inativo e não pode ser adicionado ao pedido.");
        }

        if (quantidade > produto.getQuantidadeEmEstoque()) {
            throw new EstoqueInsuficienteException(
                    produto.getCodigo(),
                    quantidade,
                    produto.getQuantidadeEmEstoque());
        }

        itens.add(new ItemPedido(produto, quantidade, produto.getPreco()));
    }

    public boolean pagar(ProcessadorPagamento processador)
            throws PagamentoRecusadoException {

        Validador.naoNulo(processador, "Forma de pagamento");

        if (situacao == SituacaoDoPedido.PAGO) {
            throw new PedidoJaPagoException(numero);
        }

        if (itens.isEmpty()) {
            throw new IllegalStateException(
                    "O pedido está vazio e não pode ser pago. Adicione pelo menos um item.");
        }

        BigDecimal total = calcularValorTotal();

        try {
            boolean aprovado = processador.processar(total);

            if (!aprovado) {
                throw new PagamentoRecusadoException(
                        processador.getDescricao(), total);
            }

            this.formaPagamento = processador;
            this.situacao = SituacaoDoPedido.PAGO;
            this.comprovante = processador.getComprovante();
            return true;

        } catch (PagamentoRecusadoException e) {
            throw e;
        } catch (RuntimeException e) {
            // Tradução da falha técnica do processador para uma exceção de negócio,
            // preservando a causa original para diagnóstico.
            throw new PagamentoRecusadoException(
                    processador.getDescricao(), total, e);
        }
    }

    public BigDecimal calcularValorTotal() {
        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : itens) {
            total = total.add(BigDecimal.valueOf(item.calcularSubtotal()));
        }
        return total;
    }

    public String getNumero() { return numero; }
    public Cliente getCliente() { return cliente; }
    public List<ItemPedido> getItens() {
        return Collections.unmodifiableList(itens);
    }
    public ProcessadorPagamento getFormaPagamento() { return formaPagamento; }
    public SituacaoDoPedido getSituacao() { return situacao; }
    public String getComprovante() { return comprovante; }
}
