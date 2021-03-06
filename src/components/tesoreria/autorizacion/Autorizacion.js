import React, { Component } from 'react'
import './Autorizacion.css'
import firebaseConf from '../../../Firebase'
import ListComponent from './ListComponent'

export default class Autorizacion extends Component {
  constructor () {
    super()
    this.state = {
      nuevo: '',
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ]
    }
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
          factura: child.val().factura,
          recibos: child.val().recibos,
          sc: child.val().sc,
          fecha: child.val().fecha,
          autorizo: child.val().autorizo,
          estatus: child.val().estatus,
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
    const itemsRef = firebaseConf.database().ref('vales/')
    this.listenForItems(itemsRef)
  }

  update = (item) => {
    let updates = {}
    updates['vales/' + item.id] = {
      vale: item.vale,
      cheque: item.cheque,
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
      estatus: 'Autorizado'
    }
    firebaseConf.database().ref().update(updates)
  }

  render () {
    return (
      <div className='banco-back' style={{ marginTop: '30px' }}>
        <div className='banco-container'>
          <ListComponent
            lista={this.state.lista}
            update={this.update}
          />
        </div>
      </div>
    )
  }
}
