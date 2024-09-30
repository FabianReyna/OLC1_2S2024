import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import body_parser from 'body-parser'
import router from './routes/IndexRouter'

class servidor {
    public app: Application
    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    config(): any {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb' }));
        this.app.use(cors());
        this.app.use(body_parser.urlencoded({ extended: true }))
    }

    routes(): void {
        this.app.use("/", router)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server On Port ', this.app.get('port'))
        })
    }
}
export const server = new servidor()
server.start()

/*import Errores from "./controllers/analizador/excepciones/Errores"
import Arbol from "./controllers/analizador/simbolo/Arbol"
import tablaSimbolo from "./controllers/analizador/simbolo/tablaSimbolo"

class patronInterpreter{
    start():any{
        try{
            let parser = require('./controllers/analizador/analizador.js')
            let ast = new Arbol(parser.parse('int a =2+3;double b = 4.1+5.2;a = a + 1;'))
            let tabla = new tablaSimbolo()
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            for(let i of ast.getInstrucciones()){
                
                var resultado = i.interpretar(ast, tabla)
                if(resultado instanceof Errores) console.log(resultado)
            }
        console.log(tabla)
        }catch(e:any){
            console.log(e)
        }
    }
}
export const patronInterpreter2 = new patronInterpreter();
patronInterpreter2.start();*/