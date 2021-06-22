import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import configureStore from './store/configureStore'
// Material Design
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// iconos
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { makeStyles } from '@material-ui/core/styles'

const store = configureStore()
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerContainer: {
    overflow: 'auto'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '70px'
  }
}))

function Routes (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <Router>
          <CssBaseline />
          <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
              <Typography variant='h6' noWrap>
                Dirección de Recursos Finacieros
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                {['Archivos'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : ''}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['Presupuesto', 'Fondo Revolvente', 'Archivos', 'Registro', 'Disponible', 'Contrarecibo', 'Carga Contrarecibo'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 10 === 0 ? <MonetizationOnIcon /> : ''}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['Presupuesto', 'Fondo Revolvente', 'Archivos', 'Registro', 'Disponible', 'Contrarecibo', 'Carga Contrarecibo'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : ''}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['Presupuesto', 'Fondo Revolvente', 'Archivos', 'Registro', 'Disponible', 'Contrarecibo', 'Carga Contrarecibo'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : ''}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            <App />
          </main>
        </Router>
      </Provider>
    </div>
  )
}

export default Routes
