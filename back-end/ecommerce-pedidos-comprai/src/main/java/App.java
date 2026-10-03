import com.ecommerce.pedidos.modelo.Produto;

import com.ecommerce.pedidos.modelo.Boleto;
import com.ecommerce.pedidos.modelo.CartaoCredito;
import com.ecommerce.pedidos.modelo.Cliente;
import com.ecommerce.pedidos.modelo.Dinheiro;
import com.ecommerce.pedidos.modelo.Endereco;
import com.ecommerce.pedidos.modelo.ItemPedido;
import com.ecommerce.pedidos.modelo.Pedido;
import com.ecommerce.pedidos.modelo.Pix;
import com.ecommerce.pedidos.modelo.Produto;
import java.math.BigDecimal;
import java.util.Date;

public class App {

    public static void main(String[] args) {

        titulo("PRODUTO");
        Produto p = new Produto();
        Produto mouse = new Produto("COD001", "MouseTek", "Mouse gamer", 300.00, 50);
        Produto teclado = new Produto("COD002", "KeyTek", "Teclado mecânico", 450.00, 10);
        System.out.println(p);
        System.out.println(mouse);
        System.out.println(teclado);
        mouse.baixarEstoque(15);
        System.out.println("Após baixar 15: " + mouse);
        System.out.println("Tem 100 em estoque? " + mouse.temEstoqueDisponivel(100));

        titulo("ENDERECO E CLIENTE");
        Endereco endereco = new Endereco("13560-000", "Rua das Flores", "100", "Centro", "São Carlos", "SP");
        Cliente cliente = new Cliente("Victor", "12345678900", "victor@email.com", endereco, "16999999999");
        System.out.println(endereco);
        System.out.println(cliente.getIdentificacao());
        System.out.println("E-mail: " + cliente.getEmail() + " | Tel: " + cliente.getTelefone());

        titulo("PEDIDO E ITENS");
        Pedido pedido = new Pedido("PED-001", cliente);
        pedido.adicionarItem(mouse, 2);
        pedido.adicionarItem(teclado, 1);
        for (ItemPedido item : pedido.getItens()) {
            System.out.println(item.getProduto().getNome() + " x" + item.getQuantidade()
                    + " = R$ " + item.calcularSubtotal());
        }
        System.out.println("Total: R$ " + pedido.calcularValorTotal());
        System.out.println("Situação: " + pedido.getSituacao());

        titulo("PAGAMENTO COM PIX");
        Pix pix = new Pix("victor@email.com");
        System.out.println("Pago? " + pedido.pagar(pix));
        System.out.println("Situação: " + pedido.getSituacao());
        System.out.println("Comprovante: " + pedido.getComprovante());
        System.out.println("Descrição: " + pix.getDescricao());
        System.out.println("Copia e cola: " + pix.gerarCodigoCopiaECola());

        titulo("PAGAMENTO COM CARTAO");
        Pedido pedidoCartao = new Pedido("PED-002", cliente);
        pedidoCartao.adicionarItem(teclado, 1);
        CartaoCredito cartao = new CartaoCredito(pedidoCartao.calcularValorTotal(), new Date(), "1234567812345678");
        System.out.println("Pago? " + pedidoCartao.pagar(cartao));
        System.out.println(cartao.getComprovante());
        System.out.println(cartao.getDescricao());
        System.out.println("3x de R$ " + cartao.calcularValorParcela(3));

        titulo("PAGAMENTO EM DINHEIRO");
        Pedido pedidoDinheiro = new Pedido("PED-003", cliente);
        pedidoDinheiro.adicionarItem(mouse, 1);
        Dinheiro dinheiro = new Dinheiro(new BigDecimal("400.00"));
        System.out.println("Pago? " + pedidoDinheiro.pagar(dinheiro));
        System.out.println("Troco: R$ " + dinheiro.calcularTroco(pedidoDinheiro.calcularValorTotal()));
        System.out.println(dinheiro.getComprovante());
        Dinheiro pouco = new Dinheiro(new BigDecimal("100.00"));
        Pedido pedidoRecusado = new Pedido("PED-004", cliente);
        pedidoRecusado.adicionarItem(mouse, 1);
        System.out.println("Pago com R$ 100? " + pedidoRecusado.pagar(pouco)
                + " | Situação: " + pedidoRecusado.getSituacao());

        titulo("PAGAMENTO COM BOLETO");
        Date amanha = new Date(System.currentTimeMillis() + 24L * 60 * 60 * 1000);
        Date ontem = new Date(System.currentTimeMillis() - 24L * 60 * 60 * 1000);
        Pedido pedidoBoleto = new Pedido("PED-005", cliente);
        pedidoBoleto.adicionarItem(mouse, 1);
        Boleto boletoOk = new Boleto(pedidoBoleto.calcularValorTotal(), amanha, "34191790010104351004791020150008");
        System.out.println("Vencido? " + boletoOk.isVencido());
        System.out.println("Pago? " + pedidoBoleto.pagar(boletoOk));
        System.out.println(boletoOk.getComprovante());
        Boleto boletoVencido = new Boleto(new BigDecimal("300.00"), ontem, "0000");
        Pedido pedidoVencido = new Pedido("PED-006", cliente);
        pedidoVencido.adicionarItem(mouse, 1);
        System.out.println("Vencido? " + boletoVencido.isVencido());
        System.out.println("Pago? " + pedidoVencido.pagar(boletoVencido));

        titulo("VALIDACOES (devem dar erro)");
        testar("Estoque insuficiente", () -> new Pedido("X", cliente).adicionarItem(teclado, 999));
        testar("Pedido sem itens", () -> new Pedido("Y", cliente).pagar(new Pix("chave")));
        testar("Preço negativo", () -> new Produto("COD9", "Teste", "d", -5, 1));
        testar("E-mail sem @", () -> new Cliente("Ana", "123", "anaemail.com", endereco, "1"));
        testar("CPF com letras", () -> new Cliente("Ana", "abc", "ana@email.com", endereco, "1"));
        testar("Quantidade zero", () -> new Pedido("Z", cliente).adicionarItem(mouse, 0));
        testar("Parcelas zero", () -> cartao.calcularValorParcela(0));
    }

    private static void titulo(String texto) {
        System.out.println();
        System.out.println("===== " + texto + " =====");
    }

    private static void testar(String nome, Runnable acao) {
        try {
            acao.run();
            System.out.println(nome + ": NÃO deu erro (verificar)");
        } catch (RuntimeException e) {
            System.out.println(nome + ": OK -> " + e.getMessage());
        }
    }
}