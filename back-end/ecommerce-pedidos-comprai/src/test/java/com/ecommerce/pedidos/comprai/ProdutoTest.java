package com.senai.ecommerce.modelo;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;
import java.math.BigDecimal;
class ProdutoTest {
private Produto notebook;
@BeforeEach
void prepararCenario() {
notebook = new Produto("Notebook", new BigDecimal("3000.00"), 5);
}
@Test
@DisplayName("Deve baixar o estoque quando há quantidade suficiente")
void deveBaixarEstoqueQuandoHaQuantidadeSuficiente() throws Exception {
notebook.baixarEstoque(2); // Act
assertEquals(3, notebook.getQuantidadeEmEstoque()); // Assert
}
} 