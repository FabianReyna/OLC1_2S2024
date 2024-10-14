import Simbolo from "./Simbolo";
import Tipo from "./Tipo";

export default class tablaSimbolo {
    private tablaActual: Map<String, Simbolo>
    private nombreDato: string
    private tablaAnterior: tablaSimbolo | any

    constructor(anterior?: tablaSimbolo) {
        this.tablaActual = new Map<String, Simbolo>()
        this.nombreDato = ""
        this.tablaAnterior = anterior
    }

    public getTabla(): Map<String, Simbolo> {
        return this.tablaActual;
    }

    public setTabla(tabla: Map<String, Simbolo>) {
        this.tablaActual = tabla
    }

    public getNombre(): string {
        return this.nombreDato
    }

    public setNombre(nombre: string): void {
        this.nombreDato = nombre
    }

    public setVariable(simbolo: Simbolo) {
        let busqueda: Simbolo = <Simbolo>this.getTabla().get(simbolo.getId().toLowerCase())
        if (busqueda == null) {
            this.tablaActual.set(simbolo.getId().toLowerCase(), simbolo)
            return true
        }
        return false

    }

    public getAnterior(): tablaSimbolo {
        return this.tablaAnterior
    }

    public getVariable(id: string) {
        for (let i: tablaSimbolo = this; i != null; i = i.getAnterior()) {
            let busqueda: Simbolo = <Simbolo>i.getTabla().get(id.toLowerCase())
            if (busqueda != null) return busqueda
        }
        return null;

    }
}