import React, { Component } from 'react'
import '../Comprometidos.css'
import firebaseConf from '../../../../Firebase'
import ListComponent from './ListComponent'

export default class XmlComp extends Component {
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
          folio: child.val().folio,
          fecha: child.val().fecha,
          importe: child.val().importe,
          usoCFDI: child.val().usoCFDI,
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
    const itemsRef = firebaseConf.database().ref('xml2/')
    this.listenForItems(itemsRef)
  }

  update = (item) => {
    let updates = {}
    updates['xml/' + item.id] = {
      folio: item.folio,
      fecha: item.fecha,
      importe: item.importe,
      usoCFDI: item.usoCFDI,
      estatus: 'sin asignar'
    }
    firebaseConf.database().ref().update(updates)
    firebaseConf.database().ref('xml2/' + item.id).remove()
  }

  render () {
    return (
      <div className='xml-back'>
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
