import React, { Component } from 'react'
import './Disponible.css'
import firebase from '../../../Firebase'
import ListComponent from './ListComponent'

export default class Disponible extends Component {
  constructor () {
    super()
    this.state = {
      lista: [
        {
          id: 1,
          name: 'preuba',
          done: false
        }
      ],
      up: '',
      proyecto: '',
      disponible: '',
      rubro: ''
    }
  }

  componentDidMount () {
    const itemsRef = firebase.database().ref('presupuesto/').orderByChild('up')
    this.listenForItems(itemsRef)
  }

  listenForItems = (itemsRef) => {
    itemsRef.on('value', (snap) => {
      var lista = []
      snap.forEach((child) => {
        lista.push({
          up: child.val().up,
          ogasto: child.val().ogasto,
          disponible: child.val().disponible,
          rubro: child.val().rubro,
          done: child.val().done,
          año: child.val().año,
          id: child.key
        })
      })
      this.setState({
        lista: lista
      })
    })
  }

  render () {
    return (
      <div className='pf-container'>
        <div className='space-d-c' />
        <div className='table-d-c'>
          <ListComponent />
        </div>
      </div>
    )
  }
}
