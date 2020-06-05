import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../../actions';
import './Login.css'

class Login extends Component {
  state = { email: '', password: '' };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(loginUser(email, password));
  };

  render() {

    const { loginError, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className='login-container'>
          <div className='back-login'>
            <div className='login-ins'>
              <div className='login-col'>
                <div className='login'>
                  <h2>Inicia Sesión</h2>
                  <div className='border-form-login'>
                    <input
                      margin='normal'
                      fullWidth
                      id='email'
                      className='input-style-1'
                      onChange={this.handleEmailChange}
                    />
                    <input
                      margin='normal'
                      fullWidth
                      className='input-style-2'
                      type='password'
                      id='password'
                      onChange={this.handlePasswordChange}
                    />
                    {loginError && (
                      <p>
                        Correo o contraseña icorrectos
                      </p>
                    )}
                    <div className='cta2'>
                      <button
                        type='button'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className='boton2-l'
                        onClick={this.handleSubmit}
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default (connect(mapStateToProps)(Login));
