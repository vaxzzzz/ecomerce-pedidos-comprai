import com.ecommerce.pedidos.modelo.FormaPagamento;

public class CartaoCredito {
    private String numeroDoCartao;

    public CartaoCredito(BigDecimal valor, Date dataDeVencimento, String numeroDoCartao) {
        super(valor, dataDeVencimento);
        setNumeroDoCartao(numeroDoCartao);
    }

    public String getNumeroDoCartao() {
        return numeroDoCartao;
    }

    public void setNumeroDoCartao(String numeroDoCartao) {
        this.numeroDoCartao = numeroDoCartao;
    }

    @Override
    public boolean processar(BigDecimal valor) {
        // Aqui vai a lógica de comunicação com a operadora de cartão
        System.out.println("Processando " + valor + " no cartão: " + numeroDoCartao);
        return true;
    }

    @Override
    public String getComprovante() {
        // Exemplo: pegando os últimos 4 dígitos do cartão para o comprovante
        String ultimosDigitos = numeroDoCartao.length() > 4
                ? numeroDoCartao.substring(numeroDoCartao.length() - 4)
                : numeroDoCartao;

        return "Comprovante gerado com sucesso. Cartão final: " + ultimosDigitos;
    }

    @Override
    public String getDescricao() {
        return "Pagamento efetuado via Cartão de Crédito";
    }

    public BigDecimal calcularValorParcela(int quantidadeParcelas) {
        if (quantidadeParcelas <= 0) {
            throw new IllegalArgumentException("A quantidade de parcelas deve ser maior que zero.");
        }

        BigDecimal valorTotal = getValor();

        return valorTotal.divide(new BigDecimal(quantidadeParcelas), 2, RoundingMode.HALF_UP);
    }
}