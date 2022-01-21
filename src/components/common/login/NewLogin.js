import React, { useState } from 'react'
// service
// import AuthService from '../../services/Auth'
// Material Ui
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import HttpsIcon from '@material-ui/icons/Https'
// import logo from '../imgs/logo.png'
// Firebase Actions
import { loginUser } from '../../../actions'
// Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: '2000'
  },
  image: {
    // backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#f4f4f4',
    backgroundSize: 'justify',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#78be20',
    color: 'white'
  },
  back: {
    backgroundColor: '#07131f',
    padding: '25px'
  },
  text: {
    color: 'white'
  },
  color: {
    color: 'white',
    marginTop: '30px'
  },
  textField: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500
  }
}))

export default function Login (props) {
  // Importaciones de estilos
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    // e.preventDefault()
    // setMessage('')
    // setLoading(true)
    // AuthService.login(email, password).then(() => {
    //   props.history.push('/perfil')
    //   window.location.reload()
    // }, error => {
    //   const resMessage = (
    //   error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    //   setLoading(false)
    //   setMessage(resMessage)
    // })
    const { dispatch } = props
    // const { email, password } = this.state
    dispatch(loginUser(email, password))
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.back}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h3' className={classes.text} align='center'>
            SISTEMA FINANCIEROS
          </Typography>
          <Typography className={classes.color}>
            Bienvenidos al Sistema Integral Informático de Administración y Finanzas.
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <PersonIcon style={{ color: 'white', marginTop: '20px', marginRight: '10px' }} />
                <TextField
                className={classes.border}
                id='email'
                name='email'
                value={email}
                label='Correo'
                fullWidth
                required
                autoComplete='email'
                autoFocus
                onChange={onChangeEmail}
                error={message === 'Usuario no encontrado.'}
                helperText={message === 'Usuario no encontrado.' ? message : ''}
                InputProps={{ style: { color: 'white', borderColor: 'white' } }}
                InputLabelProps={{ style: { color: 'white', borderColor: 'white' } }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '25px' }}>
              <HttpsIcon style={{ color: 'white', marginTop: '20px', marginRight: '10px' }} />
              <TextField
                required
                fullWidth
                name='password'
                label='Contraseña'
                type='password'
                id='password'
                onChange={onChangePassword}
                autoComplete='current-password'
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </div>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              className={classes.submit}
              disabled={loading}
            >
              {
                loading &&
                  <span />
              }
              Entrar
            </Button>
            <Box mt={5}>
              <Typography variant='body2' align='center' className={classes.text}>
                © Todos los derechos reservados PGJEH {new Date().getFullYear()}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
