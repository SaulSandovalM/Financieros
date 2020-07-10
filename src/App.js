import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
//Direcciones compartidas
import Login from './components/common/login/Login';
import Common from './components/common/home/Common';
//Parte de Cecilia
import Presupuesto from './components/cecilia/presupuesto/Presupuesto';
import FondoRevolvente from './components/cecilia/fondor/Fondor';
import Banco from './components/cecilia/banco/Banco';
import Archivos from './components/cecilia/archivos/Archivos';
import Registro from './components/cecilia/registro/Registro';
import Disponible from './components/cecilia/disponible/Disponible';
//Parte de Elizabeth
import Caja from './components/elizabeth/caja/Caja';
import Cheques from './components/elizabeth/cheques/Cheques';
import Vales from './components/elizabeth/vales/Vales';
import Autorizacion from './components/elizabeth/autorizacion/Autorizacion';
import Arqueo from './components/elizabeth/arqueo/Arqueo';
//Parte de Miguel
import Fondos from './components/miguel/fondos/Fondos';
import Comprometidos from './components/miguel/comprometidos/Comprometidos';
import Edit from './components/miguel/comprometidos/Edit';
import Analitico from './components/miguel/analitico/Analitico';
import Edita from './components/miguel/analitico/Edita';
import Consulta from './components/miguel/consulta/Consulta';
import Cpdf from './components/miguel/consulta/Cpdf';
import Pdf from './components/miguel/consulta/pdf';
import Pppdf from './components/miguel/consulta/pppdf';
import Frpdf from './components/miguel/consulta/frpdf';
import ControlP from './components/controlp/ControlP';
import Add from './components/controlp/Add';
import Complemento from './components/complemento/Complemento';
import Caratula from './components/miguel/caratula/Caratula';
//pdf
import Gasto from './components/Todospdf/FondoRevolvente/Gasto';
import objetodegastoFR from './components/Todospdf/FondoRevolvente/objetodegastoFR';
{/*import Recibo from './components/Todospdf/FondoRevolvente/Recibo';*/}
{/*import Recibo from './components/Todospdf/FondoRevolvente/Rfr';*/}




function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Route path='/Login' component={Login} />
      <ProtectedRoute
        exact
        path='/'
        component={Common}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/*Rutas de Cecilia*/}
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
        path='/FondoRevolvente'
        component={FondoRevolvente}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Archivos'
        component={Archivos}
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
        path='/Disponible'
        component={Disponible}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/*Rutas de Elizabeth*/}
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
        path='/Autorizacion'
        component={Autorizacion}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Arqueo'
        component={Arqueo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/*Rutas de Miguel*/}
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
        component={Comprometidos}
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
        path='/Gasto'
        component={Gasto}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/objetodegastoFR'
        component={objetodegastoFR}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />

      {/*}<ProtectedRoute
        exact
        path='/Recibo'
        component={Recibo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />*/}
      {/*}<ProtectedRoute
        exact
        path='/Rfr'
        component={Rfr}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />*/}




      <Route path='/edit/:id' component={Edit} />
      <Route path='/edita/:id' component={Edita} />
      <Route path='/Pdf/:id' component={Pdf} />
      <Route path='/Pppdf/:id' component={Pppdf} />
      <Route path='/Frpdf/:id' component={Frpdf} />
      <Route path='/Cpdf/:id' component={Cpdf} />
      <Route path='/add/:id' component={Add} />
      <Route path='/Gasto/:id' component={Gasto}/>
      <Route path='/objetodegastoFR/:id' component={objetodegastoFR}/>
      {/*}<Route path='/Recibo/: id' component={Recibo}/>*/}
      {/*}<Route path='/Recibo/: id' component={Rfr                                                   }/>*/}



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
