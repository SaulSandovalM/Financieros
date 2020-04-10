import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions";
import './Login.css'

const containerStyle = {
  height: '100vh',
  display: 'flex',
  alingItems: 'center',
  justifyContent: 'center',
};

class Login extends Component {
  state = { email: "", password: "" };

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
      return <Redirect to="/" />;
    } else {
      return (
        <div style={{zIndex: '5', position: 'absolute', width: '100%', top: 0, left: 0}}>
          <div className="back-login">
            <div style={containerStyle}>
              <div style={{display: 'flex', justifyContent: 'center', width: '50%'}}>
                <div className="login">
                  <h2 style={{fontFamily: 'Arial'}}>Inicia Sesión</h2>
                  <div style={{display: 'flex', flexDirection: 'column'}} className="border-form-login">
                    <input
                      margin="normal"
                      fullWidth
                      id="email"
                      name="email"
                      className="input-style-1"
                      onChange={this.handleEmailChange}
                    />
                    <input
                      margin="normal"
                      fullWidth
                      className="input-style-2"
                      name="password"
                      type="password"
                      id="password"
                      onChange={this.handlePasswordChange}
                    />
                    {loginError && (
                      <p>
                        Correo o contraseña icorrectos
                      </p>
                    )}
                    <div className="cta2">
                      <button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="boton2-l"
                        onClick={this.handleSubmit}
                      >
                        Ingresar
                      </button >
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
