import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import Common from './Common';
import Presupuesto from './components/cecilia/presupuesto/Presupuesto';
import Banco from './components/cecilia/banco/Banco';
import Caja from './components/elizabeth/caja/Caja';
import Cheques from './components/elizabeth/cheques/Cheques';
import Vales from './components/elizabeth/vales/Vales';
import Login from './components/login/Login';
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
import Caratula from './components/caratula/Caratula';
import Registro from './components/registrofondos/Registro';
import Comproceci from './components/comprometidos/Comproceci';
import Nuvale from './components/elizabeth/cheques/Nuvale';
import Pdf1 from './components/elizabeth/cheques/pdf/Pdf1';
import Pdf3 from './components/elizabeth/cheques/pdf/Pdf3';
import Fond from './components/elizabeth/cheques/pdf/Fond';
import Comprobacion from './components/elizabeth/comprobacion/Comprobacion';
import Autorizacion from './components/autorizacion/Autorizacion';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path='/'
        component={Common}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Presupuesto'
        component={Presupuesto}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Banco'
        component={Banco}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Caja'
        component={Caja}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Cheques'
        component={Cheques}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Vales'
        component={Vales}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Fondos'
        component={Fondos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Comprometidos'
        component={TablaComprometidos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Analitico'
        component={Analitico}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Consulta'
        component={Consulta}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/ControlP'
        component={ControlP}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Complemento'
        component={Complemento}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Caratula'
        component={Caratula}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Registro'
        component={Registro}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Comprometido'
        component={Comproceci}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Nuvale"
        component={Nuvale}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Pdf1"
        component={Pdf1}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Fond"
        component={Fond}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Pdf3"
        component={Pdf3}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/Comprobacion"
        component={Comprobacion}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/Login" component={Login} />
      <Route path='/show/:id' component={Show} />
      <Route path='/edit/:id' component={Edit} />
      <Route path='/edita/:id' component={Edita} />
      <Route path='/Pdf/:id' component={Pdf} />
      <Route path='/Pppdf/:id' component={Pppdf} />
      <Route path='/Frpdf/:id' component={Frpdf} />
      <Route path='/Cpdf/:id' component={Cpdf} />
      <Route path='/add/:id' component={Add} />
      <Route path='/Comprobacion' component={Comprobacion}/>
      <Route path='/Common' component={Common}/>
      <Route path='/Nuvale' component={Nuvale}/>
      <Route path='/Pdf1' component={Pdf1}/>
      <Route path='/Fond' component={Fond}/>
      <Route path='/Pdf3' component={Pdf3}/>
      <Route path='/Autorizacion' component={Autorizacion} />
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
