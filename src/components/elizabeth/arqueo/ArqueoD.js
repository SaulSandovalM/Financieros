import React, { Component } from 'react'
import './Arqueo.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import ListComponentV from './ListComponentV'
import ReactToPrint from 'react-to-print'

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
          <div>
            <ListComponentV
              listaVales={this.state.listaVales}
            />
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
