import React, { Component } from 'react'
import './Vales.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: []
    }
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <div className='caja-inputs'>
          <div className='table-left' />
          <div className='table-v-num'>
            <b>#</b>
          </div>
          <div className='table-v-importe'>
            <b>AUTORIZACION</b>
          </div>
          <div className='table-v-fechae'>
            <b>AREA</b>
          </div>
          <div className='table-v-area'>
            <b>CONCEPTO</b>
          </div>
          <div className='table-v-cantidad'>
            <b>CANTIDAD</b>
          </div>
          <div className='table-v-cheque'>
            <b>COMPROBACION</b>
          </div>
          <div className='table-v-cheque'>
            <b>CHEQUE</b>
          </div>
          <div className='table-v-edit'>
            <b>EDITAR</b>
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
