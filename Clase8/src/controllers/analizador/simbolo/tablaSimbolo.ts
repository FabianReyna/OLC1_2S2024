import Simbolo from "./Simbolo";
import Tipo from "./Tipo";

export default class tablaSimbolo {
    private tablaActual: Map<String, Simbolo>
    private nombreDato: string

    constructor() {
        this.tablaActual = new Map<String, Simbolo>()
        this.nombreDato = ""
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
}
