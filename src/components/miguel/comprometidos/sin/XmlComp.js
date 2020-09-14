import React, { Component } from 'react'
import '../Comprometidos.css'
import firebase from '../../../../Firebase'
import ListComponent from './ListComponent'

export default class XmlComp extends Component {
  constructor () {
    super()
    this.state = {
      lista: [
        {
          id: 1,
          name: 'Cargando Datos ... ',
          done: false
        },
      ]
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          folio: child.val().folio,
          fecha: child.val().fecha,
          importe: child.val().importe,
          usoCFDI: child.val().usoCFDI,
          estatus: child.val().estatus,
          name: child.val().name,
          Certificado: child.val().Certificado,
          done: child.val().done,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('xml/')
    this.listenForItems(itemsRef)
  }

  update = (item) => {
    let updates = {}
    updates['xml2/' + item.id] = {
      folio: item.folio,
      fecha: item.fecha,
      importe: item.importe,
      usoCFDI: item.usoCFDI,
      estatus: 'Asignado'
    }
    firebase.database().ref().update(updates)
    firebase.database().ref('xml/' + item.id).remove()
  }

  render() {
    return (
      <div className='xml-back-l'>
        <div className='xml-container'>
          <ListComponent
            lista={this.state.lista}
            update={this.update}
          />
        </div>
      </div>
    )
  }
}
