import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

/* E -> E + E
   E -> E - E
   E -> -E
   null == null -> true
   null != null -> false 
*/
export default class Aritmeticas extends Instruccion {
    private operando1: Instruccion
    private operando2: Instruccion
    private operacion: Operadores

    constructor(operacion: Operadores, linea: number, col: number, op1: Instruccion, op2: Instruccion) {
        super(new Tipo(tipoDato.ENTERO), linea, col)
        this.operacion = operacion
        this.operando1 = op1
        this.operando2 = op2
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let opIzq, opDer = null
        opIzq = this.operando1.interpretar(arbol, tabla)
        if (opIzq instanceof Errores) return opIzq
        opDer = this.operando2.interpretar(arbol, tabla)
        if (opDer instanceof Errores) return opDer

        switch(this.operacion){
            case Operadores.SUMA:
                return this.suma(opIzq, opDer)
            default:
                return new Errores("SEMANTICO", "Aritmeticas Erroneas", this.linea, this.col)
        }

    }

    suma(op1: any, op2: any): any {
        let tipo1 = this.operando1.tipoDato.getTipo()
        let tipo2 = this.operando2.tipoDato.getTipo()
        switch (tipo1) {
            case tipoDato.ENTERO:
                switch (tipo2) {
                    case tipoDato.ENTERO:
                        this.tipoDato.setTipo(tipoDato.ENTERO)
                        return parseInt(op1) + parseInt(op2)
                    default:
                        return new Errores("SEMANTICO", "Suma entre tipos no iguales", this.linea, this.col)
                }
            case tipoDato.DECIMAL:
                switch (tipo2) {
                    case tipoDato.DECIMAL:
                        this.tipoDato.setTipo(tipoDato.DECIMAL)
                        return parseFloat(op1) + parseFloat(op2)
                    default:
                        return new Errores("SEMANTICO", "Suma entre tipos no iguales", this.linea, this.col)
                }
            default:
                return new Errores("SEMANTICO", "Suma entre tipos no iguales", this.linea, this.col)
        }
    }
}

export enum Operadores {
    SUMA,
    RESTA,
    NEG
}
