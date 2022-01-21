import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
// Material ui
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Avatar,
  Collapse
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {
  AccountBalance,
  MonetizationOn,
  FileCopy,
  Today,
  AccountBalanceWallet,
  Receipt,
  Inbox,
  ListAlt,
  Folder,
  PlaylistAddCheck,
  FormatListNumbered,
  AssignmentTurnedIn,
  AssignmentInd,
  PlaylistAdd,
  ChevronLeft,
  ChevronRight,
  More,
  Notifications,
  Mail,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  AttachMoney,
  ImportExport,
  FormatListBulleted,
  History,
  Update
} from '@material-ui/icons'
import perfil from './components/imgs/yo.jpeg'
// Redux
// import { Provider } from 'react-redux'
// Comun
import Login from './components/comun/Login'
import Register from './components/comun/Register'
import Perfil from './components/comun/Perfil'
import BoardFondo from './components/comun/BoardFondo'
import BoardManager from './components/comun/BoardManager'
import BoardDirector from './components/comun/BoardDirector'
// Presupuesto
import Presupuesto from './components/presupuesto/Presupuesto'
import EditarPresupuesto from './components/presupuesto/EditarPresupuesto'
import Revolvente from './components/presupuesto/Revolvente'
import Archivos from './components/presupuesto/Archivos'
import Disponible from './components/presupuesto/Disponible'
import Contrarecibo from './components/presupuesto/Contrarecibo'
import Informe from './components/presupuesto/Informe'
import Movimientos from './components/presupuesto/Movimientos'
import Actualizar from './components/presupuesto/Actualizar'
//Tesoreria
import Caja from './components/tesoreria/Caja'
import Arqueo from './components/tesoreria/Arqueo'
import Cheques from './components/tesoreria/Cheques'
import ContraVales from './components/tesoreria/ContraVales'
import Vales from './components/tesoreria/Vales'
import ValesList from './components/tesoreria/ValesList'
import Caratula from './components/tesoreria/Caratula'
// Fondos
import Fondos from './components/fondos/Fondos'
// Validacion
import Validacion from './components/validacion/Validacion'
// Direccion

// Ejemplo
// import TutorialsList from './components/Tutorial-list'
// import AddTutorial from './components/Add-tutorial'
// service
// import AuthService from './services/Auth'

const drawerWidth = 240

// Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: '#07131f'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    padding: theme.spacing(0, 1),
    // necesario para que el contenido esté debajo de la barra
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  linkDecoration: {
    textDecoration: 'none',
    color: 'black'
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

export default function Routes (props) {
  const classes = useStyles()
  const theme = useTheme()
  // States
  const [open, setOpen] = useState(false)
  const [showFondoBoard, setFondoBoard] = useState(false)
  const [showTesoreriaBoard, setTesoreriaBoard] = useState(false)
  const [showPresupuestoBoard, setPresupuestoBoard] = useState(false)
  const [showValidacionBoard, setValidacionBoard] = useState(false)
  const [showAdminBoard, setAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [openCollapse, setOpenCollapse] = useState(false)
  const [openCollapse2, setOpenCollapse2] = useState(false)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  // Funciones
  const handleDrawerOpen = () => {
    if (
      currentUser ||
      showFondoBoard ||
      showTesoreriaBoard ||
      showPresupuestoBoard ||
      showValidacionBoard ||
      showAdminBoard
    ) {
      setOpen(true)
    }
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // const user = AuthService.getCurrentUser()
    // if (user) {
    //   setCurrentUser(AuthService.getCurrentUser())
    //   setFondoBoard(user.roles.includes('ROLE_FONDOS'))
    //   setTesoreriaBoard(user.roles.includes('ROLE_TESORERIA'))
    //   setPresupuestoBoard(user.roles.includes('ROLE_PRESUPUESTO'))
    //   setValidacionBoard(user.roles.includes('ROLE_VALIDACION'))
    //   setAdminBoard(user.roles.includes('ROLE_ADMIN'))
    // }
  }, [])

  const logOut = () => {
    // AuthService.logout()
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  // Components
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/perfil' className={classes.linkDecoration}>
        <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
      </Link>
      <Link to='/login' onClick={logOut} className={classes.linkDecoration}>
        <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const handleOpenOptions = () => {
    setOpenCollapse(!openCollapse)
  }

  const handleOpenOptions2 = () => {
    setOpenCollapse2(!openCollapse2)
  }

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant='h6' noWrap>
              Dirección de Recursos Financieros
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={perfil} className={classes.small} alt='' />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <More />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <Divider />
          {
            showPresupuestoBoard &&
              <List>
                <ListItem button onClick={handleOpenOptions}>
                  <ListItemIcon><AccountBalance /></ListItemIcon>
                  <ListItemText primary='Presupuesto' />
                  { openCollapse ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={openCollapse} timeout='auto' unmountExit>
                  <List component='div' disablePadding>
                    <Link to='/presupuesto' className={classes.linkDecoration}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon><AttachMoney /></ListItemIcon>
                        <ListItemText primary='Inicial' />
                      </ListItem>
                    </Link>
                    <Link to='/actualizar' className={classes.linkDecoration}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon><Update /></ListItemIcon>
                        <ListItemText primary='Actualizar' />
                      </ListItem>
                    </Link>
                    <Link to='/movimientos' className={classes.linkDecoration}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon><ImportExport /></ListItemIcon>
                        <ListItemText primary='Movimientos' />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Link to='/revolvente' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><MonetizationOn /></ListItemIcon>
                    <ListItemText primary='Revolvente' />
                  </ListItem>
                </Link>
                <Link to='/archivos' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><FileCopy /></ListItemIcon>
                    <ListItemText primary='Archivos' />
                  </ListItem>
                </Link>
                <Link to='/contrarecibo' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><PlaylistAdd /></ListItemIcon>
                    <ListItemText primary='Contrarecibo' />
                  </ListItem>
                </Link>
                <ListItem button onClick={handleOpenOptions2}>
                 <ListItemIcon><FormatListBulleted /></ListItemIcon>
                  <ListItemText primary='Consultas' />
                  { openCollapse2 ? <ExpandLess /> : <ExpandMore /> }
                </ListItem>
                <Collapse in={openCollapse2} timeout='auto' unmountExit>
                  <List component='div' disablePadding>
                    <Link to='/disponible' className={classes.linkDecoration}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
                        <ListItemText primary='Disponible' />
                      </ListItem>
                    </Link>
                    <Link to='/informe' className={classes.linkDecoration}>
                      <ListItem button className={classes.nested}>
                        <ListItemIcon><AssignmentInd  /></ListItemIcon>
                        <ListItemText primary='Informe' />
                      </ListItem>
                    </Link>
                    <Link to='/historial' className={classes.linkDecoration}>
                       <ListItem button className={classes.nested}>
                        <ListItemIcon><History /></ListItemIcon>
                        <ListItemText primary='Historial' />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
              </List>
          }
          {
            showTesoreriaBoard &&
              <List>
                <Link to='/caja' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><Inbox /></ListItemIcon>
                    <ListItemText primary='Caja' />
                  </ListItem>
                </Link>
                <Link to='/vale'>
                  <ListItem button>
                    <ListItemIcon><ListAlt /></ListItemIcon>
                    <ListItemText primary='Vales' />
                  </ListItem>
                </Link>
                <Link to='/caratula' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><Receipt /></ListItemIcon>
                    <ListItemText primary='Caratula' />
                  </ListItem>
                </Link>
              </List>
          }
          {
            showValidacionBoard &&
              <List>
                <Link to='/validacion' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
                  </ListItem>
                </Link>
              </List>
          }
          {
            showFondoBoard &&
              <List>
                <Link to='/fondos' className={classes.linkDecoration}>
                  <ListItem button>
                    <ListItemIcon><Folder /></ListItemIcon>
                    <ListItemText primary='Fondos' />
                  </ListItem>
                </Link>
                <ListItem button>
                  <ListItemIcon><PlaylistAddCheck /></ListItemIcon>
                  <ListItemText primary='Contrarecibo' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><FormatListNumbered /></ListItemIcon>
                  <ListItemText primary='Tabular' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
                  <ListItemText primary='Pasa' />
                </ListItem>
              </List>
          }
          <List>
            {
              showAdminBoard &&
                <Link to='/admin'>
                  <ListItem button>
                    <ListItemIcon><Today /></ListItemIcon>
                    <ListItemText primary='Admin' />
                  </ListItem>
                </Link>
            }
            {/*
              currentUser &&
                <Link to='/user'>
                  <ListItem button>
                    <ListItemIcon><AccountBalanceWallet /></ListItemIcon>
                    <ListItemText primary='Fondos' />
                  </ListItem>
                </Link>
            */}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            {/* Comun */}
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/perfil' component={Perfil} />
            <Route exact path='/' component={Login} />
            {/* Presupuesto */}
            <Route exact path='/presupuesto' component={Presupuesto} />
            <Route exact path='/presupuesto/:id' component={EditarPresupuesto} />
            <Route exact path='/revolvente' component={Revolvente} />
            <Route exact path='/archivos' component={Archivos} />
            <Route exact path='/disponible' component={Disponible} />
            <Route exact path='/contrarecibo' component={Contrarecibo} />
            <Route exact path='/informe' component={Informe} />
            <Route exact path='/movimientos' component={Movimientos} />
            <Route exact path='/actualizar' component={Actualizar} />
            {/* Tesoreria */}
            <Route exact path='/caja' component={Caja} />
            <Route exact path='/arqueo' component={Arqueo} />
            <Route exact path='/cheques' component={Cheques} />
            <Route exact path='/contrarecibos' component={ContraVales} />
            <Route exact path='/valeslist' component={ValesList} />
            <Route exact path='/vales' component={Vales} />
            <Route exact path='/caratula' component={Caratula} />
            {/* Validacion */}
            <Route exact path='/validacion' component={Validacion} />
            {/* Fondos */}
            <Route exact path='/fondos' component={Fondos} />
            <Route exact path='/user' component={BoardFondo} />
            <Route exact path='/mod' component={BoardManager} />
            <Route exact path='/admin' component={BoardDirector} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}
