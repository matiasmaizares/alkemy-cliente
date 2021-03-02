import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/layout/Home";
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Add from "./components/layout/Add";
import Edit from "./components/layout/Edit";
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
import Listas from './components/layout/Listas'

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}


function App(props) {
  return (

    <AlertaState>
      <AuthState>
        <Router>
          <div className="App">
           
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
              <RutaPrivada exact path="/home" component={Home} />
              <RutaPrivada exact path="/users/add" component={Add} />
              <RutaPrivada exact path="/users/edit/:id" component={Edit} />
              <RutaPrivada exact path="/listas" component={Listas} />
            </Switch>
          </div>
        </Router>
      </AuthState>
    </AlertaState>
  );
}

export default App;

