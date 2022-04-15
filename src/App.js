import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
// material ui
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "@material-ui/icons/Home";
import EventAvailable from "@material-ui/icons/EventAvailable";
import Notifications from "@material-ui/icons/Notifications";
import Room from "@material-ui/icons/Room";
import RoomService from "@material-ui/icons/RoomService";
import People from "@material-ui/icons/People";
import HowToReg from "@material-ui/icons/HowToReg";
import BarChart from "@material-ui/icons/BarChart";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import Storefront from "@material-ui/icons/Storefront";
import Person from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Event from "@material-ui/icons/Event";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
// Direcciones compartidas
// import NewLogin from "./components/common/login/NewLogin";
import Common from "./components/common/home/Common";
import Notification from "./components/notification/Notification";
import Reservas from "./components/reservas/Reservas";
import EditarReserva from "./components/reservas/EditarReserva";
import Calendario from "./components/calendario/Calendario";
import DetalleReserva from "./components/reservas/DetalleReserva";
import Sucursal from "./components/sucursal/Sucursal";
import Servicios from "./components/servicios/Servicios";
import DetalleServicio from "./components/servicios/DetalleServicio";
import Colaboradores from "./components/colaboradores/Colaboradores";
import DetalleSucursal from "./components/sucursal/DetalleSucursal";
import DetalleColaborador from "./components/colaboradores/DetalleColaborador";
import Clientes from "./components/clientes/Clientes";
import DetalleCliente from "./components/clientes/DetalleCliente";
import Estadisticas from "./components/estadisticas/Estadisticas";
import Cobros from "./components/cobros/Cobros";
import Negocio from "./components/negocio/Negocio";
import Perfil from "./components/perfil/Perfil";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  linkDecoration: {
    textDecoration: "none",
    color: "black",
  },
}));

function App(props) {
  const { isAuthenticated, isVerifying } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpenNotification((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenNotification(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenNotification(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openNotification);
  React.useEffect(() => {
    if (prevOpen.current === true && openNotification === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = openNotification;
  }, [openNotification]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <SearchIcon />
        </IconButton>
        <p>Buscar</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Wellbe
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              ref={anchorRef}
              aria-controls={openNotification ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
            <Popper
              open={openNotification}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center left" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openNotification}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          <Grid container spacing={2}>
                            <Grid item>
                              <ButtonBase className={classes.image}>
                                <img
                                  className={classes.img}
                                  alt="complex"
                                  src="/static/images/grid/complex.jpg"
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle1"
                                    color="textSecondary"
                                  >
                                    Nueva reserva
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    María Rovina
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    Corte y lavado de cabello
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Grid item xs>
                                  <Typography
                                    gutterBottom
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    Hace 18 min
                                  </Typography>
                                  <Typography variant="body2" gutterBottom>
                                    24/03/22
                                  </Typography>
                                  <Typography variant="body2">12:00</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
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
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Inicio"} />
            </ListItem>
          </Link>
          <Link to="/reservas" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <EventAvailable />
              </ListItemIcon>
              <ListItemText primary={"Reservas"} />
            </ListItem>
          </Link>
          <Link to="/notificaciones" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Notifications />
              </ListItemIcon>
              <ListItemText primary={"Notificaciones"} />
            </ListItem>
          </Link>
          <Link to="/calendario" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary={"Calendario"} />
            </ListItem>
          </Link>
          <Link to="/sucursal" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Room />
              </ListItemIcon>
              <ListItemText primary={"Sucursales"} />
            </ListItem>
          </Link>
          <Link to="/servicios" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <RoomService />
              </ListItemIcon>
              <ListItemText primary={"Servicios"} />
            </ListItem>
          </Link>
          <Link to="/colaboradores" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={"Colaboradores"} />
            </ListItem>
          </Link>
          <Link to="/clientes" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <HowToReg />
              </ListItemIcon>
              <ListItemText primary={"Clientes"} />
            </ListItem>
          </Link>
          <Link to="/estadisticas" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary={"Estadisticas"} />
            </ListItem>
          </Link>
          <Link to="/cobros" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary={"Cobros"} />
            </ListItem>
          </Link>
          <Link to="/negocio" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary={"Mi negocio"} />
            </ListItem>
          </Link>
          <Link to="/perfil" className={classes.linkDecoration}>
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Mi perfil"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {/* <Route path="/NewLogin" component={NewLogin} /> */}
          <ProtectedRoute
            exact
            path="/"
            component={Common}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          {/* rutas */}
          <ProtectedRoute
            exact
            path="/notificaciones"
            component={Notification}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/reservas"
            component={Reservas}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/editarreserva"
            component={EditarReserva}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/calendario"
            component={Calendario}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/detallereserva"
            component={DetalleReserva}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/sucursal"
            component={Sucursal}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/detallesucursal/:id"
            component={DetalleSucursal}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/servicios"
            component={Servicios}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/detalleservicio/:id"
            component={DetalleServicio}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/colaboradores"
            component={Colaboradores}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/detallecolaborador"
            component={DetalleColaborador}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/clientes"
            component={Clientes}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/detallecliente"
            component={DetalleCliente}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/estadisticas"
            component={Estadisticas}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/cobros"
            component={Cobros}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/negocio"
            component={Negocio}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/perfil"
            component={Perfil}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          {/* Rutas de Cecilia */}
          {/* <ProtectedRoute
            exact
            path="/Presupuesto"
            component={Presupuesto}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Ampliacion"
            component={Ampliacion}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Reduccion"
            component={Reduccion}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Transferencia"
            component={Transferencia}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Trans"
            component={Trans}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Saldos"
            component={Saldos}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Banco"
            component={Banco}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/FondoRevolvente"
            component={FondoRevolvente}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Archivos"
            component={Archivos}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Registro"
            component={Registro}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Disponible"
            component={Disponible}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Contra"
            component={Contra}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Editcontra/:id"
            component={Editcontra}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/CargaC"
            component={CargaC}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Informe"
            component={Informe}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          /> */}
          {/* Rutas de Elizabeth */}
          {/* <ProtectedRoute
            exact
            path="/Caja"
            component={Caja}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Cheques"
            component={Cheques}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Vales"
            component={Vales}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Valeslist"
            component={Valeslist}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/EditarVale/:id"
            component={EditarVale}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Autorizacion"
            component={Autorizacion}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Arqueo"
            component={Arqueo}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/ArqueoD"
            component={ArqueoD}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Contra2"
            component={Contra2}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          /> */}
          {/* Rutas de Miguel */}
          {/* <ProtectedRoute
            exact
            path="/Fondos"
            component={Fondos}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Comprometidos/:id"
            component={Comprometidos}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Oficios/:id"
            component={Oficios}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/FondoE/:id"
            component={FondoE}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Caratula"
            component={Caratula}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/TabularList"
            component={TabularList}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/TabularGlobal/:id"
            component={TabularGlobal}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/TabularIndividual/:id"
            component={TabularIndividual}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Contrarecibo"
            component={Contrarecibo}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/Pasa"
            component={Pasa}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          /> */}
          {/* Validacion */}
          {/* <ProtectedRoute
            exact
            path="/ArchivoPago"
            component={ArchivoPago}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          />
          <ProtectedRoute
            exact
            path="/ContraValidacion/:id"
            component={ContraValidacion}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
          /> */}
        </Switch>
      </main>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}

export default connect(mapStateToProps)(App);
