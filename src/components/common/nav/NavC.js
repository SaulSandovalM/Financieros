import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import arrow from '../../../img/arrow.svg'
import Typography from '@material-ui/core/Typography'

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
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div className='navbar-left' style={{ marginTop: '30px' }}>
            <div className='deco-c' onClick={this.toggleHidden.bind(this)}>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                attach_money
              </span>
              <Typography variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Presupuesto
              </Typography>
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
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Inicial
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Ampliacion' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Ampliacion
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Reduccion' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Reduccion
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Transferencia' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Transferencia
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Saldos' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Saldos
                  </Typography>
                </Link>
              </div>
            </div>}
          <div className='navbar-left mb'>
            <Link to='/FondoRevolvente' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px', marginBottom: '15px' }}>
                local_atm
              </span>
              <Typography className='nav-t' variant='h6'>
                Fondo Revolvente
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Archivos' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                folder_open
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Archivos
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Registro' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                plagiarism
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Registro
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Disponible' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                playlist_add_check
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Disponible
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Contra' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                receipt
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Contrarecibo
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/CargaC' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                publish
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Carga Contrarecibo
              </Typography>
            </Link>
          </div>
        </div>
        <div>
          <div className='navbar-left'>
            <div className='deco'>
              <button
                onClick={this.handleLogout}
                style={{ background: '#092432', border: 'none', display: 'flex' }}>
                <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                  person
                </span>
                <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                  Cerrar Sesión
                </Typography>
              </button>
              {isLoggingOut && <p>Cerrando Sesion....</p>}
              {logoutError && <p>Error al Cerrar Sesion</p>}
            </div>
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
