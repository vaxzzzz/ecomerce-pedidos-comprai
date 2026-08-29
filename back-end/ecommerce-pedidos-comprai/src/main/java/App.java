import com.ecommerce.pedidos.modelo.Produto;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        Produto p = new Produto();
        Produto r = new Produto("COD001", "MouseTek", "Mouse gamer", 300.00, 50);

        System.out.println(p);
        System.out.println(r);
        
        r.baixarEstoque(15);
        
        System.out.println(r);
    }
}
