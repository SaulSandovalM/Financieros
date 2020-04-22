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
import Cpdf from './components/consulta/Cpdf';
import Frpdf from './components/consulta/frpdf';

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
      <Route path="/Login" component={Login} />
      <Route path='/show/:id' component={Show} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/edita/:id' component={Edita} />
      <Route path="/Pdf/:id" component={Pdf} />
      <Route path="/Pppdf/:id" component={Pppdf} />
      <Route path="/Frpdf/:id" component={Frpdf}/>
      <Route path="/Cpdf/:id" component={Cpdf}/>
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
