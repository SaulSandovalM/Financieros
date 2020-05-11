import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/login/Login";
import Fondos from './components/fondos/Fondos';
import Analitico from './components/analitico/Analitico';
import TablaComprometidos from './components/comprometidos/TablaComprometidos';
import Consulta from './components/consulta/Consulta';
import Edit from './components/comprometidos/Edit';
import Edita from './components/analitico/Edita';
import Show from './components/comprometidos/Show';
import Pdf from './components/consulta/pdf';
import Pppdf from './components/consulta/pppdf';
import Frpdf from './components/consulta/frpdf';
import Cpdf from './components/consulta/Cpdf';
import ControlP from './components/controlp/ControlP';
import Add from './components/controlp/Add';
import Complemento from './components/complemento/Complemento';
import Addcomple from './components/complemento/Addcomple';
import Caratula from './components/caratula/Caratula';
import Presupuesto from './components/presupuesto/Presupuesto';
import Registro from './components/registrofondos/Registro';
import Comproceci from './components/comprometidos/Comproceci';
import Carga from './components/presupuesto/Carga';
import Creacionfondo from './components/presupuesto/Creacionfondo';
import FileUpload from './components/presupuesto/FileUpload';
import Excel from './components/presupuesto/Excel';
import Altas from './components/cecilia/fondorevolvente/Altas';
import Caja from './components/cecilia/fondorevolvente/Caja';
import Banco from './components/cecilia/fondorevolvente/Banco';
import Fondo from './components/cecilia/fondorevolvente/Fondo';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Fondos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Comprometidos"
        component={TablaComprometidos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Analitico"
        component={Analitico}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Consulta"
        component={Consulta}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/ControlP"
        component={ControlP}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Complemento"
        component={Complemento}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Caratula"
        component={Caratula}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Presupuesto"
        component={Presupuesto}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Carga"
        component={Carga}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Creacionfondo"
        component={Creacionfondo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Registro"
        component={Registro}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Comprometido"
        component={Comproceci}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/Login" component={Login} />
      <Route path='/show/:id' component={Show} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/edita/:id' component={Edita} />
      <Route path="/Pdf/:id" component={Pdf} />
      <Route path="/Pppdf/:id" component={Pppdf} />
      <Route path="/Frpdf/:id" component={Frpdf} />
      <Route path="/Cpdf/:id" component={Cpdf} />
      <Route path="/add/:id" component={Add} />
      <Route path="/addcomple/:id" component={Addcomple} />
      <Route path="/Carga" component={Addcomple} />
      <Route path='/FileUpload' component={FileUpload} />
      <Route path='/Excel' component={Excel} />
      <Route path='/Altas' component={Altas} />
      <Route path='/Caja' component={Caja} />
    </Switch>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
