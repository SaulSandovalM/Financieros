import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
// Direcciones compartidas
import Login from './components/common/login/Login'
import NewLogin from './components/common/login/NewLogin'
import Common from './components/common/home/Common'
// Rutas de Presupuesto
import Presupuesto from './components/presupuesto/presupuesto/Presupuesto'
import Ampliacion from './components/presupuesto/ampliacion/Ampliacion'
import Reduccion from './components/presupuesto/reduccion/Reduccion'
import Transferencia from './components/presupuesto/transferencia/ContainerT'
import Trans from './components/presupuesto/trasfsaldos/Trans'
import Saldos from './components/presupuesto/saldos/Saldos'
import FondoRevolvente from './components/presupuesto/fondor/Fondor'
import Banco from './components/presupuesto/banco/Banco'
import Archivos from './components/presupuesto/archivos/Archivos'
import Registro from './components/presupuesto/registro/Registro'
import Disponible from './components/presupuesto/disponible/Disponible'
import Contra from './components/presupuesto/contrarecibo/Contra'
import Editcontra from './components/presupuesto/contrarecibo/Editcontra'
import CargaC from './components/presupuesto/cargacontra/CargaC'
import Informe from './components/presupuesto/informe/Informe'
// Parte de Tesoreria
import Caja from './components/tesoreria/caja/Caja'
import Cheques from './components/tesoreria/cheques/Cheques'
import Vales from './components/tesoreria/vales/Vales'
import Autorizacion from './components/tesoreria/autorizacion/Autorizacion'
import Valeslist from './components/tesoreria/valeslist/Valeslist'
import EditarVale from './components/tesoreria/valeslist/EditarVale'
import Arqueo from './components/tesoreria/arqueo/Arqueo'
import ArqueoD from './components/tesoreria/arqueo/ArqueoD'
import Contra2 from './components/tesoreria/contra/Contra'
import Caratula from './components/tesoreria/caratula/Caratula'
// Rutas de Fondos
import Fondos from './components/fondos/fondos/Fondos'
import FondoE from './components/fondos/fondos/FondoE'
import Comprometidos from './components/fondos/comprometidos/Comprometidos'
import Oficios from './components/fondos/oficios/Oficios'
import Contrarecibo from './components/fondos/contrarecibo/Contrarecibo'
import TabularList from './components/fondos/tabular/Tabular'
import TabularGlobal from './components/fondos/tabular/TabularGlobal'
import TabularIndividual from './components/fondos/tabular/TabularIndividual'
import Pasa from './components/fondos/pasa/Pasa'
// Rutas Validacion
import ArchivoPago from './components/validacion/archivospago/ArchivosPago'
import ContraValidacion from './components/validacion/archivospago/ContraValidacion'

function App (props) {
  const { isAuthenticated, isVerifying } = props
  return (
    <Switch>
      <Route path='/Login' component={Login} />
      <Route path='/NewLogin' component={NewLogin} />
      <ProtectedRoute
        exact
        path='/'
        component={Common}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* Rutas de Cecilia */}
      <ProtectedRoute
        exact
        path='/Presupuesto'
        component={Presupuesto}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Ampliacion'
        component={Ampliacion}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Reduccion'
        component={Reduccion}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Transferencia'
        component={Transferencia}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Trans'
        component={Trans}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Saldos'
        component={Saldos}
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
      <ProtectedRoute
        exact
        path='/Contra'
        component={Contra}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Editcontra/:id'
        component={Editcontra}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/CargaC'
        component={CargaC}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Informe'
        component={Informe}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* Rutas de Elizabeth */}
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
        path='/Valeslist'
        component={Valeslist}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/EditarVale/:id'
        component={EditarVale}
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
      <ProtectedRoute
        exact
        path='/ArqueoD'
        component={ArqueoD}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Contra2'
        component={Contra2}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* Rutas de Miguel */}
      <ProtectedRoute
        exact
        path='/Fondos'
        component={Fondos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Comprometidos/:id'
        component={Comprometidos}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Oficios/:id'
        component={Oficios}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/FondoE/:id'
        component={FondoE}
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
        path='/TabularList'
        component={TabularList}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/TabularGlobal/:id'
        component={TabularGlobal}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/TabularIndividual/:id'
        component={TabularIndividual}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Contrarecibo'
        component={Contrarecibo}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/Pasa'
        component={Pasa}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      {/* Validacion */}
      <ProtectedRoute
        exact
        path='/ArchivoPago'
        component={ArchivoPago}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/ContraValidacion/:id'
        component={ContraValidacion}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
    </Switch>
  )
}
function mapStateToProps (state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
