import { Request, Response } from 'express';
import Arbol from './analizador/simbolo/Arbol';
import tablaSimbolo from './analizador/simbolo/tablaSimbolo';
import Errores from './analizador/excepciones/Errores';
import Metodo from './analizador/instrucciones/Metodo';
import Declaracion from './analizador/instrucciones/Declaracion';
import Run from './analizador/instrucciones/Run';

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
            let parser = require('./analizador/analizador')
            let ast = new Arbol(parser.parse(req.body.entrada))
            let tabla = new tablaSimbolo()
            tabla.setNombre("Ejemplo")
            ast.setTablaGlobal(tabla)
            ast.setConsola("")

            // primer recorrido del arbol -> almacenar funcion o metodos (structs y clases)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Metodo) {
                    ast.addFunciones(i);
                }
            }

            // segundo recorrido del arbol -> declaracion de variables o vectores (asignacion)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Declaracion) {
                    let resDeclaracion = i.interpretar(ast, tabla)
                    if (resDeclaracion instanceof Errores) ast.addErrores(resDeclaracion)
                }
                //IF ASIGNACION....
            }

            // tercer recorrido del arbol (ejecutar funcion principal RUN o EJECUTAR en su proyecto)
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Run) {
                    let res = i.interpretar(ast, tabla)
                    if (res instanceof Errores) ast.addErrores(res)
                    break;
                }
            }

            console.log(tabla)
            res.status(200).send({ "consola": ast.getConsola() })
        } catch (err: any) {
            console.log(err)
            res.status(400).send({ "Error": "Ya no sale compi1" })
        }
    }
}

export const indexController = new controller()