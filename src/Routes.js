import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Fondos from './components/fondos/Fondos';
import Analitico from './components/analitico/Analitico';
import TablaComprometidos from './components/comprometidos/TablaComprometidos';
import EditarComprometidos from './components/comprometidos/editarcomprometidos/EditarComprometidos';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Fondos}/>
    <Route exact path="/Comprometidos" component={TablaComprometidos}/>
    <Route exact path="/EditarComprometidos" component={EditarComprometidos} />
    <Route exact path="/Analitico" component={Analitico}/>
  </Switch>
);
