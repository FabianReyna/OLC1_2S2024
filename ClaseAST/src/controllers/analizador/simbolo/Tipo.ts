export default class Tipo {
    private tipo: tipoDato

    constructor(tipo: tipoDato) {
        this.tipo = tipo
    }

    public setTipo(tipo: tipoDato) {
        this.tipo = tipo;
    }
    
    public getTipo(): tipoDato {
        return this.tipo
    }

}

export enum tipoDato {
    ENTERO,
    DECIMAL,
    BOOL,
    CHAR,
    STRING,
    VOID
}