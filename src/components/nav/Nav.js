import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = props => (
  <div>
    <div className='navbar'>
      <div className="nav-col">
        <div className='navbar-navigation'>
          <img className='logo' src={'http://cdn.hidalgo.gob.mx/logo_gobhidalgo.svg'} alt=''/>
        </div>
        <div className='navbar-left'>
          <Link to="/Fondos" className="deco">
            <h3 className="nav-t">Fondos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Comprometidos" className="deco">
            <h3 className="nav-t">Comprometidos</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/Analitico" className="deco">
            <h3 className="nav-t">Analitico</h3>
          </Link>
        </div>
        <div className='navbar-left'>
          <Link to="/" className="deco">
            <h3 className="nav-t">Cerrar Sesion</h3>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Nav;
