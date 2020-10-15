import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import logoH from '../../../img/logo_h.svg'

class Nav extends Component {
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
          <Link to='/Fondos' className='deco'>
            <h3 className='nav-t'>Fondos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Caratula' className='deco'>
            <h3 className='nav-t'>Caratula</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Contrarecibo' className='deco'>
            <h3 className='nav-t'>Contrarecibo</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/TabularList' className='deco'>
            <h3 className='nav-t'>Tabular</h3>
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
