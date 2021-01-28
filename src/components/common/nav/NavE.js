import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import arrow from '../../../img/arrow.svg'
import Typography from '@material-ui/core/Typography'

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
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <div className='navbar-left' style={{ marginTop: '30px' }}>
            <Link to='/Caja' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                local_atm
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Caja
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Arqueo' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                folder_open
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Arqueo
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/ArqueoD' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                plagiarism
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Impresión de Arqueo
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Cheques' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                playlist_add_check
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Cheques
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/Contra2' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                receipt
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Contrarecibo
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <div className='deco-c' onClick={this.toggleHidden.bind(this)}>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                attach_money
              </span>
              <Typography variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Vales
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
                <Link to='/Vales' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Vale
                  </Typography>
                </Link>
              </div>
              {/*<div className='subnav'>
                <Link to='/EditVale' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Editar Vales
                  </Typography>
                </Link>
              </div>*/}
              {/*<div className='subnav'>
                <Link to='/ListValesA' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Autorizados
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/ListValesP' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • No Autorizados
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/ListValesN' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Pendientes
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/ListArchivosV' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Archivos Vales
                  </Typography>
                </Link>
              </div>*/}
              <div className='subnav'>
                <Link to='/Valeslist' className='deco'>
                  <Typography className='nav-t' style={{ marginBottom: '15px', color: 'white' }}>
                    • Lista de Vales
                  </Typography>
                </Link>
              </div>
            </div>}
            <div className='navbar-left'>
              <Link to='/Caratula' className='deco'>
                <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                  text_snippet
                </span>
                <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                  Caratula
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

export default connect(mapStateToProps)(NavE)
