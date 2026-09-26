import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Pedido {

    private final String numero;
    private final Cliente cliente;
    private final List<ItemPedido> itens = new ArrayList<>();
    private FormaPagamento formaPagamento;

    public Pedido(String numero, Cliente cliente) {
        if (numero == null || numero.blank()) {
            throw new IllegalArgumentException("Número do pedido é obrigatório");
        }
        this.cliente = Objects.requireNonNull(cliente, "Pedido exige um cliente");
        this.numero = numero;
    }

    public void adicionarItem(Produto produto, int quantidade) {
        Objects.requireNonNull(produto, "Produto é obrigatório");

        if (quantidade <= 0) {
            throw new IllegalArgumentException("A quantidade deve ser maior que zero");
        }
        if (!produto.temEstoqueDisponivel(quantidade)) {
            throw new IllegalStateException("Estoque insuficiente: " + produto.getNome());
        }

        itens.add(new ItemPedido(produto, quantidade, produto.getPreco()));
    }

    public boolean pagar(ProcessadorPagamento processador) {
        if (processador == null) {
            throw new IllegalArgumentException("Forma de pagamento é obrigatória");
        }
        if (itens.isEmpty()) {
            throw new IllegalStateException("Pedido sem itens não pode ser pago");

        }
        boolean aprovado = processador.processar(calcularValorTotal());
        if (aprovado) {
            this.situacao = SituacaoDoPedido.PAGO;
            this.comprovante = processador.getComprovante();
        }
        return aprovado;
    }

    public BigDecimal calcularValorTotal() {
        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : itens) {
            total = total.add(item.calcularSubtotal());
        }
        return total;
    }

    public String getNumero() {
        return numero;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public List<ItemPedido> getItens() {
        return Collections.unmodifiableList(itens);
    }

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }
}
