import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import logoH from '../../../img/logo_h.svg'
import arrow from '../../../img/arrow.svg'

class Nav extends Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render () {
    const { isLoggingOut, logoutError } = this.props
    return (
      <div className='nav-col'>
        <div className='navbar-navigation'>
          <img className='logo' src={logoH} alt='' />
        </div>
        <div className='navbar-left'>
          <div className='deco-c' onClick={this.toggleHidden.bind(this)}>
            <h3 className='nav-t'>
              Presupuesto
            </h3>
          </div>
          <img
            className='arrow'
            src={arrow}
            alt=''
          />
        </div>
        {!this.state.isHidden &&
          <div>
            <div className='subnav'>
              <Link to='/Presupuesto' className='deco'>
                <p className='nav-t'> &bull Inicial</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/Ampliacion' className='deco'>
                <p className='nav-t'> &bull Ampliacion</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/Reduccion' className='deco'>
                <p className='nav-t'> &bull Reduccion</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/Transferencia' className='deco'>
                <p className='nav-t'> &bull Transferencia</p>
              </Link>
            </div>
          </div>}
        <div className='navbar-left'>
          <Link to='/FondoRevolvente' className='deco'>
            <h3 className='nav-t'>Fondo Revolvente</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Archivos' className='deco'>
            <h3 className='nav-t'>Archivos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Registro' className='deco'>
            <h3 className='nav-t'>Registro</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Disponible' className='deco'>
            <h3 className='nav-t'>Disponible</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <div className='deco'>
            <button
              onClick={this.handleLogout}
              className='nav-t'
              style={{ background: '#092432', border: 'none' }}>
              <h3 className='nav-t'>
                Cerrar Sesion
              </h3>
            </button>
            {isLoggingOut && <p>Cerrando Sesion....</p>}
            {logoutError && <p>Error al Cerrar Sesion</p>}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  }
}

export default connect(mapStateToProps)(Nav)
