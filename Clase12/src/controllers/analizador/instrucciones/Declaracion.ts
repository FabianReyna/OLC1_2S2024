import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: string
    private valor: Instruccion | null

    constructor(tipo: Tipo, linea: number, col: number, id: string, valor: Instruccion) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if(this.valor == null){
            if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, null))) {
                return new Errores('SEMANTICO', 'No se puede declarar la variable',
                    this.linea, this.col
                )
            }
            return;
        }

        let resValor = this.valor.interpretar(arbol, tabla)
        if (resValor instanceof Errores) return resValor

        // TIPOS IGUALES    
        if (this.valor.tipoDato.getTipo() != this.tipoDato.getTipo()) {
            return new Errores('SEMANTICO', 'El tipo y el valor de la variable no coinciden',
                this.linea, this.col
            )
        }

        if (!tabla.setVariable(new Simbolo(this.tipoDato, this.identificador, resValor))) {
            return new Errores('SEMANTICO', 'No se puede declarar la variable',
                this.linea, this.col
            )
        }
    }
}