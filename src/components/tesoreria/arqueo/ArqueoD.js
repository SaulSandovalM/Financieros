import React, { Component } from 'react'
import './Arqueo.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListComponentV from './ListComponentV'
import ReactToPrint from 'react-to-print'
import CurrencyFormat from 'react-currency-format'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

export default class ArqueoD extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      listay: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      listaVales: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      form: [],
      alert: false,
      alertData: {},
      can1000: '',
      can500: '',
      can200: '',
      can100: '',
      can50: '',
      can20: '',
      can10: '',
      can5: '',
      can2: '',
      can1: '',
      can0: '',
      arqueo: [],
      fecha: '',
      search: '',
      numCheque: '',
      searchF: '',
      lasrResult: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          can1000: child.val().can1000,
          can500: child.val().can500,
          can200: child.val().can200,
          can100: child.val().can100,
          can50: child.val().can50,
          can20: child.val().can20,
          can10: child.val().can10,
          can5: child.val().can5,
          can2: child.val().can2,
          can1: child.val().can1,
          can0: child.val().can0,
          fecha: child.val().fecha,
          numCheque: child.val().numCheque,
          total: child.val().total,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  listenForItemsy = (itemsRefy) => {
    itemsRefy.on('value', (snap) => {
      var listay = []
      snap.forEach((child) => {
        listay.push({
          can1000: child.val().can1000,
          can500: child.val().can500,
          can200: child.val().can200,
          can100: child.val().can100,
          can50: child.val().can50,
          can20: child.val().can20,
          can10: child.val().can10,
          can5: child.val().can5,
          can2: child.val().can2,
          can1: child.val().can1,
          can0: child.val().can0,
          fecha: child.val().fecha,
          numCheque: child.val().numCheque,
          total: child.val().total,
          id: child.key
        })
      })
      this.setState({
        listay: listay
      })
    })
  }

  listenForVales = (itemsRefVales) => {
    itemsRefVales.on('value', (snap) => {
      var listaVales = []
      snap.forEach((child) => {
        listaVales.push({
          cheque: child.val().cheque,
          vale: child.val().vale,
          estatus: child.val().estatus,
          cantidadr: child.val().cantidadr,
          fecha: child.val().fecha,
          concepto: child.val().concepto,
          personaR: child.val().personaR,
          fechaP: String(child.val().fechaP),
          fechaF: String(child.val().fechaF),
          rein: String(child.val().rein),
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        listaVales: listaVales
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('arqueo/').limitToLast(1)
    this.listenForItems(itemsRef)
    const itemsRefy = firebase.database().ref('arqueo/')
    this.listenForItemsy(itemsRefy)
    const itemsRefVales = firebase.database().ref('vales/')
    this.listenForVales(itemsRefVales)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    var today = new Date()
    var yesterday = new Date()
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    var dias = ['domingo, ', 'lunes, ', 'martes, ', 'miercoles, ', 'jueves, ', 'viernes, ', 'sabado, ']
    var f = new Date()
    today = dias[f.getUTCDay()] + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    yesterday = dias[f.getUTCDay() - 1] + [f.getDate() - 1] + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    const fechab = new Date(this.state.searchF)
    const fechaAnterior = fechab.getFullYear() + '-' + ('0' + (fechab.getMonth() + 1)).slice(-2) + '-' + ('0' + fechab.getDate()).slice(-2)
    let filteredDates = this.state.listay.filter(function(date) {
      return date.fecha === fechaAnterior
    })
    var len = filteredDates.length
    filteredDates.map((rank, i) => {
      if (len === i + 1) {
        this.state.lasrResult = rank.total
        const pp = new Date(rank.fecha)
        let after = dias[pp.getUTCDay()] + [pp.getDate() + 1] + ' de ' + meses[pp.getMonth()] + ' de ' + pp.getFullYear()
        this.state.textFecha = after
      }
    })
    var aa = new Date(this.state.searchF)
    let before = dias[aa.getUTCDay()] + [aa.getDate() + 1] + ' de ' + meses[aa.getMonth()] + ' de ' + aa.getFullYear()
    const lol = this.state.listay.length
    this.state.listay.map((fil, i) => {
      if (lol === i + 1) {
        this.state.lol = fil
      }
    })
    var selectF = this.state.searchF
    var diaAnterior = this.state.lasrResult

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid className='grid-w-c'>
            <Grid className='grid-w2' style={{ marginTop: '100px' }}>
              <Paper className='paper-p-c'>
                <div>
                  <p className='sub-c-p'>Ingrese la Fechas a Buscar</p>
                  <input
                    style={{ width: '100%' }}
                    type='date'
                    className='field'
                    name='searchF'
                    value={this.state.searchF}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <ReactToPrint
                  trigger={() => <buttom className='arqueo-imp'>Imprimir</buttom>}
                  content={() => this.arqueo}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
        {this.state.searchF ?
          <div>
            {this.state.listay.map(item =>
              <div>
                {this.state.searchF === item.fecha &&
                  <div className='ar-pad' ref={el => (this.arqueo = el)}>
                    <p>Dirección General de Administración y Finanzas</p>
                    <div className='arqueoI'>
                      <p className='tb-n'>ARQUEO DE CAJA CHICA</p>
                    </div>
                    <div className='tabla-arq'>
                      <div className='tb-1'>
                        <p className='tb-n'>VALE</p>
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n'>ESTATUS DE PAGO</p>
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n'>PAGO REAL</p>
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n'>FECHA</p>
                      </div>
                      <div className='tb-2'>
                        <p className='tb-n'>DESCRIPCIÓN</p>
                      </div>
                      <div className='tb-3'>
                        <p className='tb-n'>BENEFICIARIO</p>
                      </div>
                    </div>
                    <div className='tabla-arq'>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-1'>
                        <div className='tb-n'>
                          <CurrencyFormat
                            value={this.state.lasrResult}
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              marginTop: '5px',
                              fontSize: '12px'
                            }}
                            displayType='text'
                            thousandSeparator
                            prefix='$ '
                          />
                        </div>
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-2'>
                        <p className='tb-n'>{this.state.textFecha}</p>
                      </div>
                      <div className='tb-3'>
                        <p className='tb-n' />
                      </div>
                    </div>
                    <div>
                      <ListComponentV
                        fechaSelect={selectF}
                        diaAnterior={diaAnterior}
                        before={before}
                        listaVales={this.state.listaVales}
                      />
                    </div>
                    {/* <div className='tabla-arq'>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-1'>
                        <div className='tb-n'>
                          <CurrencyFormat
                            value={this.state.lasrResult} // aqui
                            displayType='text'
                            thousandSeparator
                            prefix='$ '
                          />
                        </div>
                      </div>
                      <div className='tb-1'>
                        <p className='tb-n' />
                      </div>
                      <div className='tb-2'>
                        <p className='tb-n'>{before}</p>
                      </div>
                      <div className='tb-3'>
                        <p className='tb-n' />
                      </div>
                    </div> */}
                    <div className='arqueo-content'>
                      <div className='table-arqueo'>
                        <div className='title-arqueo'>
                          <p className='p-mar-arqueo'><b>Denominación</b></p>
                        </div>
                        <div className='title-arqueo'>
                          <p className='p-mar-arqueo'><b>Cantidad</b></p>
                        </div>
                        <div className='title-arqueo'>
                          <p className='p-mar-arqueo'><b>Total</b></p>
                        </div>
                      </div>
                      <div>
                        <div style={{ width: '100%' }}>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>1000</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can1000}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can1000) * 1000}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>500</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can500}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * 500}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>200</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can200}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * 200}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>100</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can100}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * 100}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>50</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can50}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can50) * 50}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>20</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can20}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can20) * 20}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>10</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can10}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can10) * 10}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>5</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can5}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can5) * 5}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>2</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can2}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * 2}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>1</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can1}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * 1}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>0.5</p>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>{item.can0}</p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={parseInt(item.can500) * .5}
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                          <div className='data-arqueo'>
                            <div className='title-arqueo'>
                              <b className='p-mar-arqueo'>Total</b>
                            </div>
                            <div className='title-arqueo'>
                              <p className='p-mar-arqueo'>
                                {
                                  parseInt(item.can1000) +
                                  parseInt(item.can500) +
                                  parseInt(item.can200) +
                                  parseInt(item.can100) +
                                  parseInt(item.can50) +
                                  parseInt(item.can20) +
                                  parseInt(item.can10) +
                                  parseInt(item.can5) +
                                  parseInt(item.can2) +
                                  parseInt(item.can1) +
                                  parseInt(item.can0)
                                }
                              </p>
                            </div>
                            <div className='title-arqueo'>
                              <CurrencyFormat
                                className='p-mar-arqueo'
                                value={
                                  parseInt(item.can1000) * 1000 +
                                  parseInt(item.can500) * 500 +
                                  parseInt(item.can200) * 200 +
                                  parseInt(item.can100) * 100 +
                                  parseInt(item.can50) * 50 +
                                  parseInt(item.can20) * 20 +
                                  parseInt(item.can10) * 10 +
                                  parseInt(item.can5) * 5 +
                                  parseInt(item.can2) * 2 +
                                  parseInt(item.can1) * 1 +
                                  parseInt(item.can0) * .5
                                }
                                displayType='text'
                                thousandSeparator
                                prefix='$ '
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            )}
          </div>
          :
          <h1>Selecciona una fecha</h1>
        }
      </div>
    )
  }
}
  //
  // parseInt(item.can1000) * 1000 +
  // parseInt(item.can500) * 500 +
  // parseInt(item.can200) * 200 +
  // parseInt(item.can100) * 100 +
  // parseInt(item.can50) * 50 +
  // parseInt(item.can20) * 20 +
  // parseInt(item.can10) * 10 +
  // parseInt(item.can5) * 5 +
  // parseInt(item.can2) * 2 +
  // parseInt(item.can1) * 1 +
  // parseInt(item.can0) * .5
