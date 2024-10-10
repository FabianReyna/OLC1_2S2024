export default class Contador {
    private static instancia: Contador;
    private contador: number;

    private constructor() {
        this.contador = 0;
    }

    public static getInstancia(): Contador {
        if (!Contador.instancia) {
            Contador.instancia = new Contador()
        }
        return Contador.instancia;
    }

    get() {
        this.contador += 1;
        return this.contador;
    }


}

/*
let contador = Contador.getInstancia();
let nodoInicial = contador.get(); -> 1
let nodoInicial2 = contador.get(); -> 2
*/