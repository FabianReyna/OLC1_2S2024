// equivalente a EJECUTAR de su proyecto

import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolo'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import Declaracion from './Declaracion'
import Metodo from './Metodo'

/*
run id (params) ;

params -> id igual exp

*/


export default class Run extends Instruccion {
    private id: string
    private parametros: any[]

    constructor(id: string, params: any[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col)
        this.id = id
        this.parametros = params
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        //funcion con this.id existe?
        let busqueda = arbol.getFuncion(this.id)
        if (busqueda == null) {
            return new Errores("SEMANTICO", "Funcion no existente",
                this.linea, this.col)
        }

        if (busqueda instanceof Metodo) {
            //crear nuevo entorno
            let nuevoEntorno = new tablaSimbolo(arbol.getTablaGlobal())
            nuevoEntorno.setNombre("RUN")

            //declarando parametros con valor por defecto (exp, null)
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let declaracionParametro = new Declaracion(busqueda.parametros[i].tipo,
                    this.linea, this.col, busqueda.parametros[i].id,
                    busqueda.parametros[i].valor);

                let resultadoDeclaracion = declaracionParametro.interpretar(arbol, nuevoEntorno)
                if (resultadoDeclaracion instanceof Errores) return resultadoDeclaracion


            }

            // actualizar valor de los parametros parametros del run
            for (let i = 0; i < this.parametros.length; i++) {
                //verificando existencia del parametro
                let resultado = nuevoEntorno.getVariable(this.parametros[i].id)
                if (resultado == null) {
                    return new Errores("SEMANTICO", "Parametro no existente",
                        this.linea, this.col)
                }

                // interpretar valor a asignar
                let resultadoValor = this.parametros[i].valor.interpretar(arbol, nuevoEntorno);
                if (resultadoValor instanceof Errores) return resultadoValor

                // Tipo de parametro es igual a tipo nuevo valor?
                if (resultado.getTipo().getTipo() != this.parametros[i].valor.tipoDato.getTipo()) {
                    return new Errores("SEMANTICO", "Tipo de parametro erroneo",
                        this.linea, this.col)
                }

                // asignar nuevo valor
                resultado.setValor(resultadoValor)
            }

            // validamos que ningun parametro tenga valor null
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = nuevoEntorno.getVariable(busqueda.parametros[i].id)
                if (resultado == null) {
                    return new Errores("SEMANTICO", "Faltan parametros",
                        this.linea, this.col)
                }
                if (resultado.getValor() == null) {
                    return new Errores("SEMANTICO",
                        "Existen nulos en los parametros",
                        this.linea, this.col)
                }
            }

            let resultadoMetodo: any = busqueda.interpretar(arbol, nuevoEntorno)
            if (resultadoMetodo instanceof Errores) return resultadoMetodo
        }
    }
}

// parametros de la funcion any[] -> busqueda.parametros
/*
[
    {
        tipo: tipo,
        id:string,
        valor: exp | null
    }
]
*/

// parametros de la llamada any[] -> this.parametros
/*
[
    {
        id:string,
        valor: exp 
    }
]
*/