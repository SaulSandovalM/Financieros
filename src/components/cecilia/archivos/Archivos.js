import React, { Component } from 'react'
import './Archivos.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'

export default class Archivos extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().colection('archivos').orderBy('no');
    this.unsubscribe = null;
    this.state = {
      lista: [
        {
          id: 1,
          name: 'prueba',
          done: false
        }
      ],
      fileNameA: '',
      oficioS: '',
      fileNameS: '',
      oficioA: '',
      fileNameE: '',
      excel: '',
      tipo: ''
    }
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          fileNameA: child.val().fileNameA,
          oficioS: child.val().oficioS,
          fileNameS: child.val().fileNameS,
          oficioA: child.val().oficioA,
          fileNameE: child.val().fileNameE,
          excel: child.val().excel,
          tipo: child.val().tipo,
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
    const itemsRef = firebase.database().ref('archivos-presupuesto/')
    this.listenForItems(itemsRef)
  }

  render () {
    return (
      <div className='pf-container'>
        <div className='site-pf'>
          <p className='site-pf-s'><b>Archivos</b></p>

        </div>
        <div>
              <p>Numero de oficio de Solicitud</p>
        </div>
        <div>
        <div className='archivos-container'>
          <div className='table-left'>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.ofis}*/}</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.ofia}*/}</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>{/*{movimientos.excel}*/}</p>
          </div>
          <div className='table-right'>
          </div>
        </div>
        </div>
        <div className='space-butt' />
        <div className='list-c-container'>
          <ListComponent
            lista={this.state.lista}
          />}
        </div>
      </div>
    )
  }
}
