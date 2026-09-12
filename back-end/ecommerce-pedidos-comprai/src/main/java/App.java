import com.ecommerce.pedidos.modelo.Cliente;
import com.ecommerce.pedidos.modelo.Endereco;
import com.ecommerce.pedidos.modelo.Funcionario;
import com.ecommerce.pedidos.modelo.ItemPedido;
import com.ecommerce.pedidos.modelo.Pedido;
import com.ecommerce.pedidos.modelo.Pix;
import com.ecommerce.pedidos.modelo.Produto;

public class App {

    public static void main(String[] args) {

        Endereco endereco = new Endereco(
            "Rua das Flores",
            "100",
            "São Paulo"
        );

        Cliente cliente = new Cliente(
            "João",
            "123.456.789-00",
            endereco
        );

        Produto notebook = new Produto(
            "Notebook",
            3000.00
        );

        Produto mouse = new Produto(
            "Mouse",
            100.00
        );

        ItemPedido itemNotebook = new ItemPedido(
            notebook,
            1
        );

        ItemPedido itemMouse = new ItemPedido(
            mouse,
            2
        );

        Pedido pedido = new Pedido(cliente);

        pedido.adicionarItem(itemNotebook);
        pedido.adicionarItem(itemMouse);

        pedido.definirFormaPagamento(new Pix());

        System.out.println("Cliente: " +
            pedido.getCliente().getNome());

        System.out.println("Quantidade de itens: " +
            pedido.getItens().size());

        System.out.println("Total: R$ " +
            pedido.calcularTotal());

        System.out.println("Situação: " +
            pedido.getSituacao());

        pedido.pagar();

        System.out.println("Situação após pagamento: " +
            pedido.getSituacao());

        pedido.cancelar();

        System.out.println("Situação final: " +
            pedido.getSituacao());
    }
}
