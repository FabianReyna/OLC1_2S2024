import React from "react";
import Editor from "@monaco-editor/react";
import { Menu } from "./Menu";

export class Principal extends React.Component {
    state = {
        editor: '',
        consola: ''
    }

    interpretar = () => {
        fetch('http://localhost:4000/interpretar', {
            method: 'POST',
            body: JSON.stringify({ entrada: this.state.editor }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ consola: data.consola })
            }).catch((err) => {
                alert("Algo salió mal")
                console.log(err)
            })
    }

    render() {
        return (
            <>
                <Menu />
                <br></br>
                <div className='text-center'>
                    <div>
                        <h1>Proyecto 2 - OLC1</h1>
                    </div>
                    <br></br>
                    <div className='container'>
                        <input type="button" value="Interpretar"
                            id="btnCargar" className="form-control form-control-lg"
                            onClick={this.interpretar}
                        />
                    </div>
                    <br></br>
                    <div class='text-center style={{ height: "90%", width: "90%" }} '>
                        <div className='container'>
                            <div className='row'>
                                <div className='col'>
                                    <p>Entrada:</p>
                                    <Editor height="90vh"
                                        defaultLanguage="java"
                                        defaultValue="" theme="vs-dark"
                                        onChange={(value) =>
                                            this.setState({ editor: value })} />
                                </div>
                                <div className='col'>
                                    <p>Consola:</p>
                                    <Editor height="90vh"
                                        defaultLanguage="javascript"
                                        defaultValue="" theme="vs-dark"
                                        value={this.state.consola} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }

}