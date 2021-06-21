import React, { Component } from 'react'
import './Archivos.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { Link } from 'react-router-dom'

export default class Archivos extends Component {
  constructor () {
    super()
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
      <div>
        <div className='archivos-title-font'>Archivos</div>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className='archivo-crumb'>
          <Link to='/' className='deco archivos-font'>
            Dashboard
          </Link>
          <div className='archivos-font'>Archivos</div>
        </Breadcrumbs>
        <div>
          <ListComponent
            lista={this.state.lista}
          />
        </div>
      </div>
    )
  }
}
