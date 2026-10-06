package com.ecommerce.pedidos.util;

import java.math.BigDecimal;
import java.util.Date;
import java.util.regex.Pattern;

public final class Validador {

    private static final Pattern EMAIL =
            Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    private Validador() {
    }

    public static String textoObrigatorio(String valor, String campo) {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException(campo + " é obrigatório.");
        }
        return valor.trim();
    }

    public static String somenteNumeros(String valor, String campo) {
        textoObrigatorio(valor, campo);
        if (!valor.matches("\\d+")) {
            throw new IllegalArgumentException(
                    campo + " deve conter apenas números.");
        }
        return valor;
    }

    public static String email(String email) {
        textoObrigatorio(email, "E-mail");
        if (!EMAIL.matcher(email.trim()).matches()) {
            throw new IllegalArgumentException(
                    "E-mail inválido. Informe um endereço no formato exemplo@email.com.");
        }
        return email.trim();
    }

    public static <T> T naoNulo(T valor, String campo) {
        if (valor == null) {
            throw new IllegalArgumentException(campo + " é obrigatório.");
        }
        return valor;
    }

    public static int quantidadePositiva(int quantidade, String campo) {
        if (quantidade <= 0) {
            throw new IllegalArgumentException(
                    campo + " deve ser maior que zero.");
        }
        return quantidade;
    }

    public static int quantidadeNaoNegativa(int quantidade, String campo) {
        if (quantidade < 0) {
            throw new IllegalArgumentException(
                    campo + " não pode ser negativo.");
        }
        return quantidade;
    }

    public static double precoNaoNegativo(double preco, String campo) {
        if (Double.isNaN(preco) || Double.isInfinite(preco) || preco < 0) {
            throw new IllegalArgumentException(
                    campo + " deve ser um valor válido e não negativo.");
        }
        return preco;
    }

    public static BigDecimal valorPositivo(BigDecimal valor, String campo) {
        naoNulo(valor, campo);
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException(
                    campo + " deve ser maior que zero.");
        }
        return valor;
    }

    public static Date dataObrigatoria(Date data, String campo) {
        return naoNulo(data, campo);
    }
}
