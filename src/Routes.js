import React, { useState, useRef } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import App from './App'
import configureStore from './store/configureStore'
import { useOnClickOutside } from './hooks'
import FocusLock from 'react-focus-lock'
import Burger from './components/common/nav/Burger'
import Menu from './components/common/nav/Menu'
import history from './history'

const store = configureStore()

function Routes () {
  const [open, setOpen] = useState(false)
  const node = useRef()
  const menuId = 'main-menu'
  useOnClickOutside(node, () => setOpen(false))

  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <div ref={node}>
            <FocusLock disabled={!open}>
              <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
              <Menu open={open} setOpen={setOpen} id={menuId} />
            </FocusLock>
          </div>
          <App />
        </Router>
      </Provider>
    </div>
  )
}

export default Routes
