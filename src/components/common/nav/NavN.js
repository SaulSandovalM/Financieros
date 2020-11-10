import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../../actions'
import { connect } from 'react-redux'
import './Nav.css'
import Typography from '@material-ui/core/Typography'

class NavN extends Component {
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
          <div className='navbar-left' style={{ marginTop: '40px' }}>
            <Link to='/Autorizacion' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                done_all
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Autorización
              </Typography>
            </Link>
          </div>
          <div className='navbar-left'>
            <Link to='/ListValesA' className='deco'>
              <span className='material-icons' style={{ color: 'white', marginTop: '3px', marginRight: '15px' }}>
                attach_money
              </span>
              <Typography className='nav-t' variant='h6' style={{ marginBottom: '15px', color: 'white' }}>
                Vales Autorizados
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

export default connect(mapStateToProps)(NavN)
