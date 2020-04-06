import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import Nav from './components/nav/Nav';

const store = configureStore();

function Routes() {
  return (
    <Provider store={store}>
      <Router>
        <Nav/>
        <App />
      </Router>
    </Provider>
  );
}

export default Routes;
