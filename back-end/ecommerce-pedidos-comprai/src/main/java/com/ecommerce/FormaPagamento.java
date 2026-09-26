import java.math.BigDecimal;

public abstract class FormaPagamento {
    private BigDecimal valor;
    private Date dataDeVencimento;

    public abstract String processar();
}
