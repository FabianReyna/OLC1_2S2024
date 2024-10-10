export default class Errores {
    private tipoError: string
    private desc: string
    private linea: number
    private col: number

    constructor(tipo: string, desc: string, linea: number, col: number) {
        this.tipoError = tipo
        this.desc = desc
        this.linea = linea
        this.col = col
    }
    public getDesc(): string {
        return this.desc
    }
    public getTipoError(): string {
        return this.tipoError
    }
    public getLinea(): number {
        return this.linea
    }
    public getCol(): number {
        return this.col
    }
    public getErrores(): any {
        return {
            "tipo": this.tipoError, "desc": this.desc, "linea":
                this.linea, "col": this.col
        }
    }
    public toString(): string {
        return "----- Error " + this.tipoError + ": " + this.desc + "en la linea " +
            this.linea + " y columna " + this.col + " ----";
    }


}