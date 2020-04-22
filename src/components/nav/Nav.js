import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../actions";
import { connect } from "react-redux";
import './Nav.css';

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  render() {

    const { isLoggingOut, logoutError } = this.props;

    return (
      <div className="nav-col">
        <div className='navbar-navigation'>
          <img className='logo' src={'http://cdn.hidalgo.gob.mx/logo_gobhidalgo.svg'} alt=''/>
        </div>
        <div className='navbar-left'>
          <Link to="/" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Fondos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Comprometidos" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Comprometidos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Analitico" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Analitico</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Consulta" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Consulta</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/ControlP" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Control Presupuestal</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Complemento" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Complemento de Pago</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Caratula" className="deco">
            <h3 className="nav-t" style={{fontFamily: 'Arial'}}>Caratula</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <div className="deco">
          <button onClick={this.handleLogout} className="nav-t" style={{background: '#092432', border: 'none'}}><h3 className="nav-t" style={{fontFamily: 'Arial'}}>Cerrar Sesion</h3></button>
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
