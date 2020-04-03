import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Fondos from './components/fondos/Fondos';
import Analitico from './components/analitico/Analitico';
import TablaComprometidos from './components/comprometidos/TablaComprometidos';
import Edit from './components/comprometidos/Edit';
import Show from './components/comprometidos/Show';
import Login from './components/login/LoginContainer';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login}/>
    <Route exact path="/Fondos" component={Fondos}/>
    <Route exact path="/Comprometidos" component={TablaComprometidos}/>
    <Route path='/show/:id' component={Show} />
    <Route path='/edit/:id' component={Edit} />
    <Route exact path="/Analitico" component={Analitico}/>
  </Switch>
);
