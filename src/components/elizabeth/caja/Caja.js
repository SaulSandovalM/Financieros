import React, { Component } from 'react'
import firebase from '../../../Firebase'
import './Caja.css'
import CurrencyFormat from 'react-currency-format'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class Caja extends Component {
  constructor (props) {
    super(props)
    this.ref = firebase.firestore().collection('caja')
    this.unsubscribe = null
    this.state = {
      contador: {},
      title: '',
      no: '',
      personaR: '',
      cantidad: '',
      movimientos: [],
      buscador: ''
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const movimientos = []
    querySnapshot.forEach((doc) => {
      const { title, no, personaR, cantidad, fecha } = doc.data()
      movimientos.push({
        key: doc.id,
        doc,
        title,
        no,
        personaR,
        cantidad,
        fecha
      })
    })
    this.setState({
      movimientos
   })
  }

  componentDidMount () {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    this.consumo()
  }

  consumo = () => {
    const ref = firebase.firestore().collection('caja').doc('--stats--')
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          contador: doc.data(),
          key: doc.id,
          isLoading: false
        })
      } else {
        console.log('No hay nada!')
      }
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    var today = new Date()
    var meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var f = new Date()
    today = f.getFullYear() + '-' + meses[f.getMonth()] + '-' + f.getDate()
    console.log(this.state.buscador)

    return (
      <div className='container-back'>
        <div className='site'>
          <p className='site-s'><b>Caja</b></p>
        </div>
        <div>
          <div className='caja-container'>
            <div className='caja-inputs'>
              <div className='disponible-banco'>
                <div>
                  <p className='cantidad-banco'>
                    MXN
                    <CurrencyFormat
                      value={this.state.contador.storyCount}
                      displayType='text'
                      prefix=' $'
                      thousandSeparator
                      decimalSeparator='.'
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className='p-container-banco'>
              <TextField
                value={this.state.buscador}
                name='buscador'
                type='date'
                data-date-format='DD-MM-YYYY'
                onChange={this.handleChange.bind(this)}
                label='Buscador'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className='space-table-b' />
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell className='table-caja'><b>Movimientos</b></TableCell>
                    <TableCell className='table-caja'><b>Fecha</b></TableCell>
                    <TableCell className='table-caja'><b>Cantidad</b></TableCell>
                  </TableRow>
                </TableHead>
                {this.state.movimientos.map(movimientos =>
                  <TableBody>
                    {
                      (this.state.buscador === movimientos.fecha || today === movimientos.fecha) ?
                        <TableRow>
                          <TableCell className='table-caja'>{movimientos.title} - {movimientos.no} - {movimientos.personaR}</TableCell>
                          <TableCell className='table-caja'>{movimientos.fecha}</TableCell>
                          <TableCell className='table-caja'>
                            <CurrencyFormat
                              value={movimientos.cantidad}
                              displayType='text'
                              thousandSeparator
                              prefix=' $'
                            />
                          </TableCell>
                        </TableRow>
                      : null
                    }
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    )
  }
}
