import React from 'react'
import { bool, func } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const Burger = ({ open, setOpen, ...props }) => {
  const isExpanded = open !== false
  return (
    <div>
      <AppBar style={{ backgroundColor: '#092432' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-expanded={isExpanded}
            open={open}
            onClick={() => setOpen(!open)} {...props}
            aria-label='burger'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>
            Dirección de Recursos Financieros
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired
}

export default Burger
