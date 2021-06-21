import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
// iconos
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded'
import MultilineChartRoundedIcon from '@material-ui/icons/MultilineChartRounded'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
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
    } else if (email === 'validacion@procuraduria.com') {
      admin = 'VALIDACION' // hkV4l1d4c10n
    }

    return (
      <div>
        <Toolbar />
        <div style={{ overflow: 'auto' }}>
          <List style={{ padding: '0px' }}>
            <Link to='/' className='deco'>
              <ListItem button>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
            </Link>
          </List>
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/' className='deco'>
                <ListItem button>
                  <ListItemIcon><EqualizerRoundedIcon /></ListItemIcon>
                  <ListItemText primary='Presupuesto' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/FondoRevolvente' className='deco'>
                <ListItem button>
                  <ListItemIcon><MultilineChartRoundedIcon /></ListItemIcon>
                  <ListItemText primary='Fondo Revolvente' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Archivos' className='deco'>
                <ListItem button>
                  <ListItemIcon><FolderOpenIcon /></ListItemIcon>
                  <ListItemText primary='Archivos' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Registro' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Registro' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Disponible' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Disponible' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Contra' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Contrarecibo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'CECILIA' || admin === 'ALFREDO' || admin === 'LIZBETH') &&
            <List style={{ padding: '0px' }}>
              <Link to='/CargaC' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Carga Contrarecibo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Caja' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Caja' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Arqueo' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Arqueo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Arqueo' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Arqueo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/ArqueoD' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Arqueo Diario' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Cheques' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Cheques' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Contra2' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Contrarecibo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Vales' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Vales' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'ELI' || admin === 'LIZBETH' || admin === 'JUAN') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Valeslist' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Lista de vales' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' ||
            admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' ||
            admin === 'OMAR' || admin === 'LILIA') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Fondos' className='deco'>
                <ListItem button>
                  <ListItemIcon><CreateNewFolderIcon /></ListItemIcon>
                  <ListItemText primary='Fondos' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' ||
            admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' ||
            admin === 'OMAR' || admin === 'LILIA') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Contrarecibo' className='deco'>
                <ListItem button>
                  <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                  <ListItemText primary='Contrarecibo' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'LIZBETH' || admin === 'ELI' || admin === 'TERESA' || admin === 'HECTOR') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Caratula' className='deco'>
                <ListItem button>
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary='Caratula' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'MIGUEL' || admin === 'LIZBETH' || admin === 'TERESA' || admin === 'ELOY' ||
            admin === 'MARTHA' || admin === 'KARINA' || admin === 'HECTOR' || admin === 'CENELY' ||
            admin === 'OMAR' || admin === 'LILIA') &&
            <List style={{ padding: '0px' }}>
              <Link to='/TabularList' className='deco'>
                <ListItem button>
                  <ListItemIcon><ReceiptIcon /></ListItemIcon>
                  <ListItemText primary='Tabular' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'MIGUEL') &&
            <List style={{ padding: '0px' }}>
              <Link to='/Pasa' className='deco'>
                <ListItem button>
                  <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                  <ListItemText primary='Pasa' />
                </ListItem>
              </Link>
            </List>
          }
          {admin === 'NAYRA' &&
            <List style={{ padding: '0px' }}>
              <Link to='/Autorizacion' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Autorizacion' />
                </ListItem>
              </Link>
            </List>
          }
          {(admin === 'VALIDACION') &&
            <List style={{ padding: '0px' }}>
              <Link to='/ArchivoPago' className='deco'>
                <ListItem button>
                  <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                  <ListItemText primary='Validación' />
                </ListItem>
              </Link>
            </List>
          }
          <List style={{ padding: '0px' }} onClick={this.handleLogout}>
            <ListItem button>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary='Cerrar Sesion' />
            </ListItem>
            {isLoggingOut && <p>Cerrando Sesion....</p>}
            {logoutError && <p>Error al Cerrar Sesion</p>}
          </List>
          <Divider />
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
