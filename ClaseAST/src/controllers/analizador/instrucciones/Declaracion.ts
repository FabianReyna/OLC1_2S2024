import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/Simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Declaracion extends Instruccion {
    private identificador: string
    private valor: Instruccion

    constructor(tipo: Tipo, linea: number, col: number, id: string, valor: Instruccion) {
        super(tipo, linea, col)
        this.identificador = id
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
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

    getAST(arbol: Arbol, anterior: string): string {
        let nodoDeclaracion = arbol.getNodoAST()
        let nodoTipo = arbol.getNodoAST()
        let nodoId = arbol.getNodoAST()
        let nodoIgual = arbol.getNodoAST()
        let nodoValor = arbol.getNodoAST()
        let nodoPuntoComa = arbol.getNodoAST()

        let resultado = `${nodoDeclaracion}[label=\"DECLARACION\"];\n`;
        resultado += `${nodoTipo}[label=\"TIPO\"];\n`
        resultado += `${nodoId}[label=\"ID\"];\n`
        resultado += `${nodoIgual}[label=\"=\"];\n`
        resultado += `${nodoValor}[label=\"VALOR\"];\n`
        resultado += `${nodoPuntoComa}[label=\";\"];\n`

        resultado += `${anterior} -> ${nodoDeclaracion};\n`
        resultado += `${nodoDeclaracion} -> ${nodoTipo};\n`
        resultado += `${nodoDeclaracion} -> ${nodoId};\n`
        resultado += `${nodoDeclaracion} -> ${nodoIgual};\n`
        resultado += `${nodoDeclaracion} -> ${nodoValor};\n`
        resultado += `${nodoDeclaracion} -> ${nodoPuntoComa};\n`

        let resId = arbol.getNodoAST();

        resultado += `${resId}[label=\"${this.identificador}\"];\n`
        resultado += `${nodoId} -> ${resId};\n`

        resultado += this.valor.getAST(arbol, nodoValor)
        let nodoTipoDato = arbol.getNodoAST()
        switch (this.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                resultado += `${nodoTipoDato}[label=\"int\"];\n`
                break
            case tipoDato.DECIMAL:
                resultado += `${nodoTipoDato}[label=\"double\"];\n`
                break
            default:
                resultado += ``
        }

        resultado +=`${nodoTipo} -> ${nodoTipoDato};\n`
        return resultado;






    }
}