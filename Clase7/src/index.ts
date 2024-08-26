class ejemploJison {
    start(): any {
        try {
            let parser = require('./analizador.js')
            let resultado = parser.parse('evAluAr{1+2};imprimir{\"hola mundo\"};')
        } catch (e: any) {
            console.log(e)
        }
    }
}
export const ejemploJison2 = new ejemploJison();
ejemploJison2.start();