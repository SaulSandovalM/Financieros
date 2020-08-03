import React, { Component } from 'react'
import './Archivos.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      presupuesto: []
    }
  }

  componentWillMount () {
    firebase.database().ref('archivos-presupuesto/').on('child_added', snapshot => {
      this.setState({
        presupuesto: this.state.presupuesto.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <div className='archivos-container'>
          <div className='table-left' />
          <div className='table-archivos'>
            <p className='p-archivos'>OFICIO SOLICITUD</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>OFICIO AUTORIZACION</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>EXCEL</p>
          </div>
          <div className='table-archivos'>
            <p className='p-archivos'>TIPO</p>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}
