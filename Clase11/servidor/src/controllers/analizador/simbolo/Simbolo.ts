import Tipo from "./Tipo";

export default class Simbolo {
    private tipo: Tipo
    private id: string
    private valor: any

    constructor(tipo: Tipo, id: string, valor?: any) {
        this.tipo = tipo
        this.id = id.toLocaleLowerCase()
        this.valor = valor
    }

    public getTipo(): Tipo {
        return this.tipo
    }

    public SetTipo(tipo: Tipo): void {
        this.tipo = tipo
    }

    public getId(): string {
        return this.id
    }

    public setId(id: string): void {
        this.id = id
    }

    public getValor(): any {
        return this.valor
    }

    public setValor(valor: any): void {
        this.valor = valor
    }
}