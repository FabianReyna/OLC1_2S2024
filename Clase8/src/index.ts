import Errores from "./controllers/analizador/excepciones/Errores"
import Arbol from "./controllers/analizador/simbolo/Arbol"
import tablaSimbolo from "./controllers/analizador/simbolo/tablaSimbolo"

class patronInterpreter{
    start():any{
        try{
            let parser = require('./controllers/analizador/analizador.js')
            let ast = new Arbol(parser.parse('2+3;4+5.2;'))
            let tabla = new tablaSimbolo()
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            for(let i of ast.getInstrucciones()){
                console.log(i)
                var resultado = i.interpretar(ast, tabla)
                if(resultado instanceof Errores) console.log(resultado)
            }
        }catch(e:any){
            console.log(e)
        }
    }
}
export const patronInterpreter2 = new patronInterpreter();
patronInterpreter2.start();