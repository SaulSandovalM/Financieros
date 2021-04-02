import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import Typography from '@material-ui/core/Typography'
import arrow from '../../../img/arrow.svg'
import firebase from '../../../Firebase'

class Nav extends Component {
  constructor () {
    super()
    this.state = {
      isHiddenV: true,
      isHiddenP: true
    }
  }

  toggleHiddenP () {
    this.setState({
      isHiddenP: !this.state.isHiddenP
    })
  }

  toggleHiddenV () {
    this.setState({
      isHiddenV: !this.state.isHiddenV
    })
  }

  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render () {
    const { isLoggingOut, logoutError } = this.props
    var user = firebase.auth().currentUser
    var email

    if (user != null) {
      email = user.email
    }

    let admin
    if (email === 'administrador@procu.com') {
      admin = 'ADMIN'
    } else if (email === 'cecilia@procuraduria.com') {
      admin = 'CECILIA'
    } else if (email === 'alfredo@procuraduria.com') {
      admin = 'ALFREDO'
    } else if (email === 'nayra@procuraduria.com') {
      admin = 'NAYRA'
    } else if (email === 'lizbeth@procuraduria.com') {
      admin = 'LIZBETH'
    } else if (email === 'miguel@procuraduria.com') {
      admin = 'MIGUEL'
    } else if (email === 'teresa@procuraduria.com') {
      admin = 'TERESA'
    } else if (email === 'marcos@procuraduria.com') {
      admin = 'MARCOS'
    } else if (email === 'eloy@procuraduria.com') {
      admin = 'ELOY'
    } else if (email === 'karina@procuraduria.com') {
      admin = 'KARINA'
    } else if (email === 'martha@procuraduria.com') {
      admin = 'MARTHA'
    } else if (email === 'lilia@procuraduria.com') {
      admin = 'LILIA'
    } else if (email === 'cenely@procuraduria.com') {
      admin = 'CENELY'
    } else if (email === 'hector@procuraduria.com') {
      admin = 'HECTOR'
    } else if (email === 'omar@procuraduria.com') {
      admin = 'OMAR'
    } else if (email === 'elizabeth@procuraduria.com') {
      admin = 'ELI'
    } else if (email === 'juan@procuraduria.com') {
      admin = 'JUAN'
    }

    return (
      <div className='nav-col'>
        <div className='nav-cont'>
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left' style={{ marginTop: '30px' }}>
              <div className='deco-c' onClick={this.toggleHiddenP.bind(this)}>
                <span className='material-icons'>
                  attach_money
                </span>
                <Typography variant='h6' className='typo-sty'>
                  Presupuesto
                </Typography>
              </div>
              <img
                className='arrow'
                src={arrow}
                alt=''
              />
            </div>
          }
          {!this.state.isHiddenP &&
            <div>
              <div className='subnav'>
                <Link to='/Presupuesto' className='deco'>
                  <Typography className='nav-t'>
                    • Inicial
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Ampliacion' className='deco'>
                  <Typography className='nav-t'>
                    • Ampliacion
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Reduccion' className='deco'>
                  <Typography className='nav-t'>
                    • Reduccion
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Transferencia' className='deco'>
                  <Typography className='nav-t'>
                    • Transferencia
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Trans' className='deco'>
                  <Typography className='nav-t'>
                    • Saldos
                  </Typography>
                </Link>
              </div>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/Saldos' className='deco'>
                <span className='material-icons'>
                  account_balance
                </span>
                <Typography className='nav-t' variant='h6'>
                  Saldos
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/FondoRevolvente' className='deco'>
                <span className='material-icons'>
                  local_atm
                </span>
                <Typography className='nav-t' variant='h6'>
                  Fondo Revolvente
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/Archivos' className='deco'>
                <span className='material-icons'>
                  folder_open
                </span>
                <Typography className='nav-t' variant='h6'>
                  Archivos
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/Registro' className='deco'>
                <span className='material-icons'>
                  plagiarism
                </span>
                <Typography className='nav-t' variant='h6'>
                  Registro
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/Disponible' className='deco'>
                <span className='material-icons'>
                  playlist_add_check
                </span>
                <Typography className='nav-t' variant='h6'>
                  Disponible
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/Contra' className='deco'>
                <span className='material-icons'>
                  receipt
                </span>
                <Typography className='nav-t' variant='h6'>
                  Contrarecibo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'CECILIA' || admin === 'LIZBETH') &&
            <div className='navbar-left'>
              <Link to='/CargaC' className='deco'>
                <span className='material-icons'>
                  publish
                </span>
                <Typography className='nav-t' variant='h6'>
                  Carga Contrarecibo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left' style={{ marginTop: '30px' }}>
              <Link to='/Caja' className='deco'>
                <span className='material-icons'>
                  local_atm
                </span>
                <Typography className='nav-t' variant='h6'>
                  Caja
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left'>
              <Link to='/Arqueo' className='deco'>
                <span className='material-icons'>
                  folder_open
                </span>
                <Typography className='nav-t' variant='h6'>
                  Arqueo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left'>
              <Link to='/ArqueoD' className='deco'>
                <span className='material-icons'>
                  plagiarism
                </span>
                <Typography className='nav-t' variant='h6'>
                  Impresión de Arqueo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left'>
              <Link to='/Cheques' className='deco'>
                <span className='material-icons'>
                  playlist_add_check
                </span>
                <Typography className='nav-t' variant='h6'>
                  Cheques
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left'>
              <Link to='/Contra2' className='deco'>
                <span className='material-icons'>
                  receipt
                </span>
                <Typography className='nav-t' variant='h6'>
                  Contrarecibo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <div className='navbar-left'>
              <div className='deco-c' onClick={this.toggleHiddenV.bind(this)}>
                <span className='material-icons'>
                  attach_money
                </span>
                <Typography variant='h6' className='nav-t'>
                  Vales
                </Typography>
              </div>
              <img
                className='arrow'
                src={arrow}
                alt=''
              />
            </div>
          }
          {!this.state.isHiddenV &&
            <div>
              <div className='subnav'>
                <Link to='/Vales' className='deco'>
                  <Typography className='nav-t'>
                    • Vale
                  </Typography>
                </Link>
              </div>
              <div className='subnav'>
                <Link to='/Valeslist' className='deco'>
                  <Typography className='nav-t'>
                    • Lista de Vales
                  </Typography>
                </Link>
              </div>
            </div>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' || admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' || admin === 'OMAR') &&
            <div className='navbar-left' style={{ marginTop: '30px' }}>
              <Link to='/Fondos' className='deco'>
                <span className='material-icons'>
                  request_quote
                </span>
                <Typography className='nav-t' variant='h6'>
                  Fondos
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' || admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' || admin === 'OMAR') &&
            <div className='navbar-left'>
              <Link to='/Contrarecibo' className='deco'>
                <span className='material-icons'>
                  payments
                </span>
                <Typography className='nav-t' variant='h6'>
                  Contrarecibo
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'LIZBETH' || admin === 'ELI' || admin === 'TERESA' || admin === 'HECTOR') &&
            <div className='navbar-left'>
              <Link to='/Caratula' className='deco'>
                <span className='material-icons'>
                  text_snippet
                </span>
                <Typography className='nav-t' variant='h6'>
                  Caratula
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' || admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' || admin === 'OMAR') &&
            <div className='navbar-left'>
              <Link to='/TabularList' className='deco'>
                <span className='material-icons'>
                  format_list_bulleted
                </span>
                <Typography className='nav-t' variant='h6'>
                  Tabular
                </Typography>
              </Link>
            </div>
          }
          {(admin === 'MIGUEL') &&
            <div className='navbar-left'>
              <Link to='/Pasa' className='deco'>
                <span className='material-icons'>
                  request_quote
                </span>
                <Typography className='nav-t' variant='h6'>
                  Pasa
                </Typography>
              </Link>
            </div>
          }
          {admin === 'NAYRA' &&
            <div className='navbar-left' style={{ marginTop: '40px' }}>
              <Link to='/Autorizacion' className='deco'>
                <span className='material-icons'>
                  done_all
                </span>
                <Typography className='nav-t' variant='h6'>
                  Autorización
                </Typography>
              </Link>
            </div>
          }
        </div>
        <div>
          <div className='navbar-left'>
            <div className='deco'>
              <button className='btn-nav' onClick={this.handleLogout}>
                <span className='material-icons'>
                  person
                </span>
                <Typography className='nav-t' variant='h6'>
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
