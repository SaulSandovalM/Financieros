import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions';
import { connect } from 'react-redux';
import './Nav.css';
import logo_h from '../../../img/logo_h.svg';

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {

    const { isLoggingOut, logoutError } = this.props;

    return (
      <div className='nav-col'>
        <div className='navbar-navigation'>
          <img className='logo' src={logo_h} alt=''/>
        </div>
        <div className='navbar-left'>
          <Link to='/Presupuesto' className='deco'>
            <h3 className='nav-t'>Presupuesto</h3>
          </Link>
        </div>
        <div className='subnav'>
          <Link to='/Ampliacion' className='deco'>
            <p className='nav-t'>Ampliacion</p>
          </Link>
        </div>
        <div className='subnav'>
          <Link to='/Reduccion' className='deco'>
            <p className='nav-t'>Reduccion</p>
          </Link>
        </div>
        <div className='subnav'>
          <Link to='/Transferencia' className='deco'>
            <p className='nav-t'>Transferencia</p>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/FondoRevolvente' className='deco'>
            <h3 className='nav-t'>Fondo Revolvente</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Banco' className='deco'>
            <h3 className='nav-t'>Banco</h3>
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

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Nav);
