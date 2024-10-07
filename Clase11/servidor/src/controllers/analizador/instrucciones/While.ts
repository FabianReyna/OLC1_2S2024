import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'

// WHILE PAR1 EXP PAR2 LLAVE1 INSTRUCCIONES LLAVE2
export default class While extends Instruccion {
    private condicion: Instruccion
    private instrucciones: Instruccion[]

    constructor(cond: Instruccion, ins: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.condicion = cond
        this.instrucciones = ins
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla)
        if (cond instanceof Errores) return cond

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) {
            return new Errores('SEMANTICO', 'LA CONDICION DEBE SER BOOL',
                this.linea, this.col)
        }

        while (this.condicion.interpretar(arbol, tabla)) {
            let nuevaTabla = new tablaSimbolo(tabla)
            for(let i of this.instrucciones){
                let resultados = i.interpretar(arbol, nuevaTabla)
                
                // recuperacion de errores semanticos
                if (resultados instanceof Errores) {
                    arbol.addErrores(resultados)
                }
            }

        }
    }
}
