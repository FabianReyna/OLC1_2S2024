/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package clase4;

import analisis.parser;
import analisis.scanner;
import java.io.BufferedReader;
import java.io.StringReader;

/**
 *
 * @author fabian
 */
public class Clase4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        try {
            // TODO code application logic here
            String texto = "imprimir(+ - 10 10 10);";
            parser p = new parser(new scanner(new BufferedReader(new StringReader(texto))));
            var resultado = p.parse().value;
            System.out.println(resultado);
        } catch (Exception ex) {
            System.out.println("Algo salio mal");
        }
    }
    
}
