package com.ecommerce.pedidos.comprai;

import javax.sound.sampled.SourceDataLine;
import java.util.Random;

public class reciboPedido {
    public static String gerarNumeroDoPedido() {
        Random sorteador = new Random();

        int numeroAleatorio = sorteador.nextInt(100000);

        return String.format("PED-2026-%05d", numeroAleatorio);
    }


    private static final double TAXA_FRETE_POR_KG = 6.76;   
    private static final double FRETE_MINIMO = 20.00;       
    private static final double LIMITE_FRETE_GRATIS = 200.00; 

    public static double calcularSubtotal(double[] precos, int[] quantidades) {

        if (precos == null || quantidades == null) {

        }
        if (precos.length != quantidades.length) {

        }
        double subtotal = 0.0;

        for (int i = 0; i < precos.length; i++) {

            if (precos[i] < 0 || quantidades[i] < 0) {

            }
            subtotal += precos[i] * quantidades[i];

        }
        return subtotal;
    }
    public static double calcularFrete(double pesoTotal, double valorPedido) {
    
    if (valorPedido >= LIMITE_FRETE_GRATIS) {
        return 0.0; 
    }

  
    if (pesoTotal == 0.0) {
        return 0.0;
    }

  
    double pesoArredondado = Math.ceil(pesoTotal);
    double freteCalculado = pesoArredondado * TAXA_FRETE_POR_KG;

    return Math.max(freteCalculado, FRETE_MINIMO);
}


// A ULTIMA PARTE FEITA FOI "Cobra por quilo iniciado (Math.ceil), respeita o frete mínimo (Math.max) e zera acima do valor de frete grátis."
// VAI FALTAR A Aplica a taxa percentual e respeita o teto do desconto (Math.min). EM DIANTE

    

}