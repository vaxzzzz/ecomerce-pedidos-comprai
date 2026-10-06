import com.ecommerce.pedidos.excecao.ECommerceException;
import com.ecommerce.pedidos.excecao.EstoqueInsuficienteException;
import com.ecommerce.pedidos.excecao.PagamentoRecusadoException;
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
import java.util.Scanner;

public class App {

    public static void main(String[] args) {
        Produto mouse = new Produto(
                "COD001", "MouseTek", "Mouse gamer", 300.00, 50);
        Produto teclado = new Produto(
                "COD002", "KeyTek", "Teclado mecânico", 450.00, 10);

        Endereco endereco = new Endereco(
                "13560-000", "Rua das Flores", "100",
                "Centro", "São Carlos", "SP");
        Cliente cliente = new Cliente(
                "Victor", "12345678900",
                "victor@email.com", endereco, "16999999999");

        titulo("CAMINHO FELIZ");
        Pedido pedido = new Pedido("PED-001", cliente);
        executar("Adicionar mouse", () -> pedido.adicionarItem(mouse, 2));
        executar("Adicionar teclado", () -> pedido.adicionarItem(teclado, 1));
        System.out.println("Total: R$ " + pedido.calcularValorTotal());

        executar("Pagamento Pix", () -> {
            pedido.pagar(new Pix("victor@email.com"));
            System.out.println("Situação: " + pedido.getSituacao());
            System.out.println("Comprovante: " + pedido.getComprovante());
        });

        titulo("CENÁRIOS DE EXCEÇÃO");

        executar("Estoque insuficiente",
                () -> new Pedido("PED-ERR-001", cliente)
                        .adicionarItem(teclado, 999));

        executar("Pedido sem itens",
                () -> new Pedido("PED-ERR-002", cliente)
                        .pagar(new Pix("chave-pix")));

        executar("Preço negativo",
                () -> new Produto("COD9", "Teste", "Produto inválido", -5, 1));

        executar("E-mail sem @",
                () -> new Cliente(
                        "Ana", "123", "anaemail.com", endereco, "1"));

        executar("CPF com letras",
                () -> new Cliente(
                        "Ana", "abc", "ana@email.com", endereco, "1"));

        executar("Quantidade zero",
                () -> new Pedido("PED-ERR-003", cliente)
                        .adicionarItem(mouse, 0));

        executar("Parcelas zero",
                () -> {
                    CartaoCredito cartao = new CartaoCredito(
                            new BigDecimal("450.00"),
                            new Date(),
                            "1234567812345678");
                    cartao.calcularValorParcela(0);
                });

        executar("Pagamento recusado",
                () -> {
                    Pedido pedidoRecusado = new Pedido("PED-ERR-004", cliente);
                    pedidoRecusado.adicionarItem(mouse, 1);
                    pedidoRecusado.pagar(new Dinheiro(new BigDecimal("100.00")));
                });

        executar("Pagamento de boleto vencido",
                () -> {
                    Pedido pedidoVencido = new Pedido("PED-ERR-005", cliente);
                    pedidoVencido.adicionarItem(mouse, 1);

                    Date ontem = new Date(
                            System.currentTimeMillis() - 24L * 60 * 60 * 1000);

                    pedidoVencido.pagar(new Boleto(
                            new BigDecimal("300.00"),
                            ontem,
                            "34191790010104351004791020150008"));
                });

        executar("Pedido pago pela segunda vez",
                () -> {
                    Pedido pedidoPago = new Pedido("PED-ERR-006", cliente);
                    pedidoPago.adicionarItem(mouse, 1);
                    pedidoPago.pagar(new Pix("pix@email.com"));
                    pedidoPago.pagar(new Pix("outro@email.com"));
                });

        titulo("TRY-WITH-RESOURCES");
        try (Scanner scanner = new Scanner("Aula 09")) {
            System.out.println("Recurso fechado automaticamente: "
                    + scanner.nextLine());
        }

        titulo("FIM");
        System.out.println("O programa terminou sem stack trace.");
    }

    @FunctionalInterface
    private interface AcaoComErro {
        void executar() throws ECommerceException;
    }

    private static void executar(String nome, AcaoComErro acao) {
        try {
            acao.executar();
            System.out.println(nome + ": OK");
        } catch (EstoqueInsuficienteException | PagamentoRecusadoException e) {
            System.out.println(nome + ": " + e.getMessage());
        } catch (IllegalArgumentException | IllegalStateException e) {
            System.out.println(nome + ": " + e.getMessage());
        } catch (ECommerceException e) {
            System.out.println(nome + ": " + e.getMessage());
        } catch (RuntimeException e) {
            // Última barreira do fluxo de apresentação: nenhum stack trace chega ao usuário.
            System.out.println(nome + ": " + e.getMessage());
        }
    }

    private static void titulo(String texto) {
        System.out.println();
        System.out.println("===== " + texto + " =====");
    }
}
