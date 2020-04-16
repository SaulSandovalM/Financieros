import React, { useState, useRef } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import configureStore from "./store/configureStore";
import { useOnClickOutside } from './hooks';
import FocusLock from 'react-focus-lock';
import Burger from './components/nav/Burger';
import Menu from './components/nav/Menu';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

const store = configureStore();

function Routes() {

  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} />
            </FocusLock>
          </div>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default Routes;
