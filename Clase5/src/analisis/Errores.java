/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package analisis;

/**
 *
 * @author fabian
 */
public class Errores {

    public String tipo;
    public String desc;
    public int linea;
    public int col;

    public Errores(String tipo, String desc, int linea, int col) {
        this.tipo = tipo;
        this.desc = desc;
        this.linea = linea;
        this.col = col;
    }

    @Override
    public String toString() {
        return "Errores{" + "tipo=" + tipo + ", desc=" + desc + ", linea=" + linea + ", col=" + col + '}';
    }
    
    

}
