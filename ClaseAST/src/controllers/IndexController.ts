import { Request, Response } from 'express';
import Arbol from './analizador/simbolo/Arbol';
import tablaSimbolo from './analizador/simbolo/tablaSimbolo';
import Errores from './analizador/excepciones/Errores';

let graficoAST: string

class controller {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public pruebaPost(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.parametro1)
        res.json({ "funciona": "la api" });
    }

    public interpretar(req: Request, res: Response) {
        try {
            graficoAST = "digraph G {\n"
            let parser = require('./analizador/analizador')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new tablaSimbolo()
            tabla.setNombre("Ejemplo")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")
            for (let i of ast.getInstrucciones()) {
                var resultado = i.interpretar(ast, tabla)
                if (resultado instanceof Errores) console.log(resultado)
            }

            // NINICIO -> INSTR
            let nodoInicio = ast.getNodoAST();
            let nodoInstrucciones = ast.getNodoAST()

            graficoAST += `${nodoInicio}[label=\"INICIO\"];\n`
            graficoAST += `${nodoInstrucciones}[label=\"INSTRUCCIONES\"];\n`
            graficoAST += `${nodoInicio} -> ${nodoInstrucciones};\n`
            for (let i of ast.getInstrucciones()) {
                //let nodoIns [label="Instruccion"]
                graficoAST += i.getAST(ast, nodoInstrucciones)
            }

            graficoAST += "\n}"
            console.log(tabla)
            res.status(200).send({ "consola": "" })
        } catch (err: any) {
            console.log(err)
            res.status(400).send({ "Error": "Ya no sale compi1" })
        }
    }

    public getAst(req:Request, res:Response){
        console.log(graficoAST)
        res.json({"ast": graficoAST})
    }
}

export const indexController = new controller()