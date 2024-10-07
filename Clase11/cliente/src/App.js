import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Principal } from './componentes/Principal';
import { Menu } from './componentes/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Principal /><br></br></>} />
        <Route path="/reporteErrores"
          element={<><Menu /><br></br><h1>Reporte de Errores</h1></>} />
        <Route path="/reporteSimbolos"
          element={<><Menu /><br></br><h1>Reporte de Simbolos</h1></>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
