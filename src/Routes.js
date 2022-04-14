import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import Login from "./components/common/login/Login";

const store = configureStore();

function Routes() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/Login" component={Login} />
          </Switch>
          <App />
        </Router>
      </Provider>
    </div>
  );
}

export default Routes;
