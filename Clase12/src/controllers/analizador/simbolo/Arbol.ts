import tablaSimbolo from "./tablaSimbolo";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Metodo from "../instrucciones/Metodo";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private consola: string
    private tablaGlobal: tablaSimbolo
    private errores: Array<Errores>
    private funciones: Array<Instruccion>

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones
        this.consola = ""
        this.tablaGlobal = new tablaSimbolo()
        this.errores = new Array<Errores>()
        this.funciones = new Array<Instruccion>()
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tablaGlobal = tabla
    }

    public getErrores(): any {
        return this.errores
    }

    public Print(entrada: any) {
        this.consola = `${this.consola}${entrada}\n`
    }

    public addErrores(error: Errores) {
        this.errores.push(error)
    }

    public getFunciones() {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>) {
        this.funciones = funciones
    }

    public addFunciones(funcion: Instruccion) {
        this.funciones.push(funcion)
    }

    public getFuncion(id: string) {
        for (let i of this.getFunciones()) {
            if (i instanceof Metodo) {
                if (i.id.toLowerCase() == id.toLowerCase()) {
                    return i
                }
            }
        }
        return null
    }
}