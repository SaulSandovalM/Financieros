import React, { Component } from 'react'
import './Arqueo.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListComponentV from './ListComponentV'
import ReactToPrint from 'react-to-print'
import CurrencyFormat from 'react-currency-format'

export default class ArqueoD extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
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
      numCheque: ''
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
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        lista: lista
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
          cantidad: child.val().cantidad,
          fecha: child.val().fecha,
          concepto: child.val().concepto,
          personaR: child.val().personaR,
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
    const itemsRefVales = firebase.database().ref('vales/')
    this.listenForVales(itemsRefVales)
  }

  render () {
    var today = new Date()
    var today2 = new Date()
    var yesterday = new Date()
    var yesterday2 = new Date()
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
    var dias = ['domingo, ', 'lunes, ', 'martes, ', 'miercoles, ', 'jueves, ', 'viernes, ', 'sabado, ']
    var f = new Date()
    today = dias[f.getUTCDay()] + f.getDate() + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    today2 = f.getFullYear() + '-' + [f.getMonth() + 1] + '-' + f.getDate()
    yesterday = dias[f.getUTCDay() - 1] + [f.getDate() - 1] + ' de ' + meses[f.getMonth()] + ' de ' + f.getFullYear()
    yesterday2 = f.getFullYear() + '-' + [f.getMonth() + 1] + '-' + [f.getDate() - 1]

    return (
      <div>
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
              <p className='tb-n'></p>
            </div>
            <div className='tb-1'>
              <p className='tb-n'></p>
            </div>
            <div className='tb-1'>
              {
                this.state.lista.map(item =>
                  <div className='tb-n'>
                    {item.fecha === yesterday2 &&
                      <CurrencyFormat
                        value={item.total}
                        displayType='text'
                        thousandSeparator
                        prefix='$ '
                      />
                    }
                  </div>
                )
              }
            </div>
            <div className='tb-1'>
              <p className='tb-n'></p>
            </div>
            <div className='tb-2'>
              <p className='tb-n'>{yesterday}</p>
            </div>
            <div className='tb-3'>
              <p className='tb-n'></p>
            </div>
          </div>
          <div>
            <ListComponentV
              listaVales={this.state.listaVales}
            />
          </div>
          <div className='tabla-arq'>
            <div className='tb-1'>
              <p className='tb-n'></p>
            </div>
            <div className='tb-1'>
              <p className='tb-n'></p>
            </div>
            <div className='tb-1'>
              {
                this.state.lista.map(item =>
                  <div className='tb-n'>
                    {item.fecha === today2 &&
                      <CurrencyFormat
                        value={item.total}
                        displayType='text'
                        thousandSeparator
                        prefix='$ '
                      />
                    }
                  </div>
                )
              }
            </div>
            <div className='tb-1'>
              <p className='tb-n'></p>
            </div>
            <div className='tb-2'>
              <p className='tb-n'>{today}</p>
            </div>
            <div className='tb-3'>
              <p className='tb-n'></p>
            </div>
          </div>
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
              <ListComponent
                lista={this.state.lista}
              />
            </div>
          </div>
        </div>
        <div className='boton-v'>
          <ReactToPrint
            trigger={() => <div className='boton-vale'>Imprimir</div>}
            content={() => this.arqueo}
          />
        </div>
      </div>
    )
  }
}
