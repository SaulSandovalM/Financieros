import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import logo from "../../../img/logoh.png";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

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
        <div className="login-container">
          <div className="login-back">
            <div className="login-ins">
              <div className="login-col">
                <div className="login">
                  <div className="login-card">
                    <div className="login-sep-log">
                      <div className="login-c">
                        <img
                          className="logo-img"
                          src={
                            "https://firebasestorage.googleapis.com/v0/b/well-be-7e1c0.appspot.com/o/logo.png?alt=media&token=c38b2b08-a5a6-4a20-b950-c1278e2e8717"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="login-border-form">
                      <div className="login-input-cen">
                        <TextField
                          className="login-inputs-width"
                          label="Correo Electronico"
                          variant="outlined"
                          id="email"
                          onChange={this.handleEmailChange}
                        />
                      </div>
                      <div className="login-input-cen">
                        <TextField
                          className="login-inputs-width"
                          label="Contraseña"
                          variant="outlined"
                          id="password"
                          type="password"
                          onChange={this.handlePasswordChange}
                        />
                      </div>
                      {loginError && (
                        <p className="error-log">
                          Correo o contraseña icorrectos
                        </p>
                      )}
                      <div className="login-ctb">
                        <Button
                          className="login-inputs-width"
                          variant="contained"
                          color="primary"
                          onClick={this.handleSubmit}
                        >
                          Iniciar Sesión
                        </Button>
                      </div>
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
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Login);
