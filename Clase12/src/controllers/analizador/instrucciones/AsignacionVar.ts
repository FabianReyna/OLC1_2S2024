import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

// id = exp ;
export default class AsignacionVar extends Instruccion {
    private id: string
    private exp: Instruccion

    constructor(id: string, exp: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.exp = exp
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        // la variable debe de existir
        let variable = tabla.getVariable(this.id.toLowerCase())
        if (variable == null) {
            return new Errores('SEMANTICO', 'La variable no existe',
                this.linea, this.col)
        }

        //la variable es mutable?

        // expresion valida
        let newValor = this.exp.interpretar(arbol, tabla)
        if (newValor instanceof Errores) return newValor

        // Tipos iguales
        if (this.exp.tipoDato.getTipo() != variable.getTipo().getTipo()) {
            return new Errores('SEMANTICO', 'Los tipos deben de ser iguales',
                this.linea, this.col)
        }

        this.tipoDato = variable.getTipo()
        variable.setValor(newValor)
    }

}