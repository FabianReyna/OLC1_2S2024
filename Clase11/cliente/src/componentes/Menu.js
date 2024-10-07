import React from "react";
import { Link } from "react-router-dom";

export class Menu extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse"
                        id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <b><Link to="/" class="nav-link active"
                                    aria-current="page">Inicio</Link></b>
                            </li>
                            <li class="nav-item">
                                <Link to="/reporteErrores"
                                    class="nav-link active" aria-current="page">Reporte Errores</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/reporteSimbolos"
                                    class="nav-link active" aria-current="page">Reporte Simbolos</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}