import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions';
import { connect } from 'react-redux';
import './Nav.css';
import logo_h from '../../img/logo_h.svg';

class NavE extends Component {
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
          <Link to='/Caja' className='deco'>
            <h3 className='nav-t' style={{fontFamily: 'Arial'}}>Caja</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Cheques' className='deco'>
            <h3 className='nav-t' style={{fontFamily: 'Arial'}}>Cheques</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to='/Vales' className='deco'>
            <h3 className='nav-t' style={{fontFamily: 'Arial'}}>Vales</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <div className='deco'>
            <button
              onClick={this.handleLogout}
              className='nav-t'
              style={{background: '#092432', border: 'none'}}>
              <h3 className='nav-t' style={{fontFamily: 'Arial'}}>
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

export default connect(mapStateToProps)(NavE);
