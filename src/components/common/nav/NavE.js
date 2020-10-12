import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import logoH from '../../../img/logo_h.svg'
import arrow from '../../../img/arrow.svg'

class NavE extends Component {
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
          <Link to='/Caja' className='deco'>
            <h3 className='nav-t'>Caja</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Arqueo' className='deco'>
            <h3 className='nav-t'>Arqueo</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/ArqueoD' className='deco'>
            <h3 className='nav-t'>Impresión de Arqueo</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Cheques' className='deco'>
            <h3 className='nav-t'>Cheques</h3>
          </Link>
        </div>
        <div className='navbar-left' onClick={this.toggleHidden.bind(this)}>
          <div className='deco'>
            <h3 className='nav-t'>Vales</h3>
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
              <Link to='/Vales' className='deco'>
                <p className='nav-t'> • Vale</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/ListValesA' className='deco'>
                <p className='nav-t'> • Autorizados</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/ListValesP' className='deco'>
                <p className='nav-t'> • No Autorizados</p>
              </Link>
            </div>
            <div className='subnav'>
              <Link to='/ListValesN' className='deco'>
                <p className='nav-t'> • Pendientes</p>
              </Link>
            </div>
            {/*<div className='subnav'>
              <Link to='/ListArchivosV' className='deco'>
                <p className='nav-t'> • Archivos Vales</p>
              </Link>
            </div>*/}
          </div>}
        <div className='navbar-left'>
          <div className='deco'>
            <button
              onClick={this.handleLogout}
              className='nav-t'
              style={{background: '#092432', border: 'none'}}>
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

export default connect(mapStateToProps)(NavE)
