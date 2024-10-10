import { Instruccion } from "../abstracto/Instruccion";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolo";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, linea: number, col: number) {
        super(tipo, linea, col)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return this.valor
    }

    getAST(arbol: Arbol, anterior: string): string {
        let nodoNativo = arbol.getNodoAST() // n1
        let nodoValor = arbol.getNodoAST() // n2
        let resultado = `${nodoNativo}[label=\"NATIVO\"];\n`
        resultado += `${nodoValor}[label=${this.valor}];\n`
        resultado += `${nodoNativo} -> ${nodoValor};\n`
        resultado += `${anterior} -> ${nodoNativo};\n`

        return resultado
    }
}