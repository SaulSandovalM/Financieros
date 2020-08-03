import React, { Component } from 'react'
import './Autorizacion.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vale: []
    }
  }

  componentWillMount () {
    firebase.database().ref('vale/').on('child_added', snapshot => {
      this.setState({
        vale: this.state.vale.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <div className='banco-inputs-list'>
          <div className='table-left' />
          <div className='table-banco-up'>
            <b>VALE</b>
          </div>
          <div className='table-banco-partida'>
            <b>CANTIDAD</b>
          </div>
          <div className='table-banco-proyecto'>
            <b>CONCEPTO</b>
          </div>
          <div className='table-banco-nombre'>
            <b>AREA</b>
          </div>
          <div className='table-banco-monto'>
            <b>PERSONA R</b>
          </div>
          <div className='table-banco-porcentaje'>
            <b>AUTORIZACION</b>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.lista.map(item =>
            <RowComponent
              key={item.id}
              item={item}
              update={this.props.update}
            />
          )
        }
      </div>
    )
  }
}
