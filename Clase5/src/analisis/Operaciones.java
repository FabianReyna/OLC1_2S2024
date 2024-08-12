/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package analisis;

/**
 *
 * @author fabian
 */
public class Operaciones {

    public Operaciones() {
    }

    public static double Neg(double op1) {
        return -op1;
    }

    public static double Suma(double op1, double op2) {
        //toda su programacion
        return op1 + op2;
    }

    public static double Resta(double op1, double op2) {
        return op1 - op2;
    }

    public static double Mult(double op1, double op2) {
        return op1 * op2;
    }

    public static double Div(double op1, double op2) {
        if (op2 == 0) {
            return 0;
        }
        return op1 / op2;
    }

    public static double CastValue(String op1) {
        return Double.parseDouble(op1);
    }

}
