import React, { Component } from 'react'
import firebase from '../../../Firebase'
import ListN from './ListN'
import './ListVales.css'

export default class ListValesN extends Component {
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
      form: [],
      alert: false,
      alertData: {},
      cheque: '',
      contador: {},
      isHidden: true
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          vale: child.val().vale,
          cheque: child.val().cheque,
          cantidad: child.val().cantidad,
          cantidadc: child.val().cantidadc,
          cantidadr: child.val().cantidadr,
          concepto: child.val().concepto,
          oficioS: child.val().oficioS,
          area: child.val().area,
          turno: child.val().turno,
          personaR: child.val().personaR,
          estatus: child.val().estatus,
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          reintegroT: child.val().reintegroT,
          autorizo: child.val().autorizo,
          fecha: child.val().fecha,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('vales/')
    this.listenForItems(itemsRef)
  }

  componentWillMount () {
    const formRef = firebase.database().ref('vales').orderByKey().limitToLast(1)
    formRef.on('child_added', snapshot => {
      const { vale, cheque, cantidad, cantidadc, cantidadr, concepto, oficioS, area, turno, personaR, estatus, autorizo, fecha } = snapshot.val()
      const data = { vale, cheque, cantidad, cantidadc, cantidadr, concepto, oficioS, area, turno, personaR, estatus, autorizo, fecha }
      this.setState({ form: [data].concat(this.state.form) })
    })
  }

  update = (item) => {
    let updates = {}
    updates['vales/' + item.id] = {
      vale: item.vale,
      cheque: this.state.cheque,
      cantidad: item.cantidad,
      cantidadc: item.cantidadc,
      cantidadr: item.cantidadr,
      concepto: item.concepto,
      oficioS: item.oficioS,
      area: item.area,
      turno: item.turno,
      personaR: item.personaR,
      factura: item.factura,
      recibos: item.recibos,
      sc: item.sc,
      fecha: item.fecha,
      autorizo: item.autorizo,
      estatus: item.estatus
    }
    firebase.database().ref().update(updates)
  }

  render () {
    return (
      <div className='container-back'>
        <div className='site'>
          <p className='site-s'><b>Vales Pendientes de Numero de Cheque</b></p>
        </div>
        <div className='input-val-p'>
          <p>Ingresa el numero de cheque</p>
          <input
            name='cheque'
            value={this.state.cheque}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className='caja-w' style={{ marginTop: '40px', marginBottom: '40px' }}>
          <div className='caja-col'>
            <ListN
              lista={this.state.lista}
              update={this.update}
            />
          </div>
        </div>
      </div>
    )
  }
}
