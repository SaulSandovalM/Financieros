import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'
// Direcciones compartidas
import Login from './components/common/login/Login'
import Common from './components/common/home/Common'
// Parte de Cecilia
import Presupuesto from './components/cecilia/presupuesto/Presupuesto'
import Ampliacion from './components/cecilia/ampliacion/Ampliacion'
import Reduccion from './components/cecilia/reduccion/Reduccion'
import Transferencia from './components/cecilia/transferencia/ContainerT'
import FondoRevolvente from './components/cecilia/fondor/Fondor'
import Banco from './components/cecilia/banco/Banco'
import Archivos from './components/cecilia/archivos/Archivos'
import Registro from './components/cecilia/registro/Registro'
import Disponible from './components/cecilia/disponible/Disponible'
import Contra from './components/cecilia/contrarecibo/Contra'
import Editcontra from './components/cecilia/contrarecibo/Editcontra'
import CargaC from './components/cecilia/cargacontra/CargaC'
// Parte de Elizabeth
import Caja from './components/elizabeth/caja/Caja'
import Cheques from './components/elizabeth/cheques/Cheques'
import Vales from './components/elizabeth/vales/Vales'
import ListValesA from './components/elizabeth/listavales/ListValesA' // Autorizados
import ListValesP from './components/elizabeth/listavales/ListValesP' // Vales Pendientes de Autorizacion Nayra
import ListValesN from './components/elizabeth/listavales/ListValesN' // Pendientes de numero de cheques
import ListArchivosV from './components/elizabeth/listavales/ListArchivosV'
import Autorizacion from './components/elizabeth/autorizacion/Autorizacion'
import Arqueo from './components/elizabeth/arqueo/Arqueo'
import ArqueoD from './components/elizabeth/arqueo/ArqueoD'
// Parte de Miguel
import Fondos from './components/miguel/fondos/NewFondos'
import FondoE from './components/miguel/fondos/FondoE'
import Comprometidos from './components/miguel/comprometidos/Comprometidos'
import Oficios from './components/miguel/oficios/Oficios'
import Consulta from './components/miguel/consulta/Consulta'
import Cpdf from './components/miguel/consulta/Cpdf'
import ControlP from './components/controlp/ControlP'
import Add from './components/controlp/Add'
import Complemento from './components/complemento/Complemento'
import Caratula from './components/miguel/caratula/Caratula'

import Gasto from './components/miguel/Todospdf/FondoRevolvente/Gasto'
import ObjetodegastoFR from './components/miguel/Todospdf/FondoRevolvente/objetodegastoFR'
import Recibo from './components/miguel/Todospdf/FondoRevolvente/Recibo'
import Rfr from './components/miguel/Todospdf/FondoRevolvente/Rfr'
// Pagoproveedor
import ObjetodegastoPP from './components/miguel/Todospdf/Pagoproveedor/objetodegastoPP'
import Gastoprovee from './components/miguel/Todospdf/Pagoproveedor/Gastoprovee'
import Pagoproveedor from './components/miguel/Todospdf/Pagoproveedor/pagoproveedor'
// Diciembre
import Comprobaciondegastocomprobar from './components/miguel/Todospdf/Diciembre/comprobaciondegastocomprobar'
import Gastodiciembre from './components/miguel/Todospdf/Diciembre/gastodiciembre'
import Objetodegastodiciembre from './components/miguel/Todospdf/Diciembre/objetodegastodiciembre'
// pagoproveedor por requisicion
import Gastoppr from './components/miguel/Todospdf/Pagoaproveedorporrequisicion/gastoppr'
import Solicitudppr from './components/miguel/Todospdf/Pagoaproveedorporrequisicion/solicitudppr'
import Ofisolicitudppr from './components/miguel/Todospdf/Pagoaproveedorporrequisicion/ofisolicitudppr'

function App (props) {
  const { isAuthenticated, isVerifying } = props
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
        path='/ListValesP'
        component={ListValesP}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/ListValesA'
        component={ListValesA}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/ListArchivosV'
        component={ListArchivosV}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path='/ListValesN'
        component={ListValesN}
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
      <Route path='/Cpdf/:id' component={Cpdf} />
      <Route path='/add/:id' component={Add} />
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
