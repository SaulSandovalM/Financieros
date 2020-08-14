import React, { Component } from 'react'
import './Fondor.css'
import RowCompoBanco from './RowCompoBanco'
import firebase from '../../../Firebase'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      banco: []
    }
  }

  componentWillMount () {
    firebase.database().ref('banco/').on('child_added', snapshot => {
      this.setState({
        banco: this.state.banco.concat(snapshot.val())
      })
    })
  }

  render () {
    return (
      <div>
        <div className='table-container-p'>
          <div className='table-left' />
          <div className='table-up-p-fr'>
            <b>Up</b>
          </div>
          <div className='table-up-p-fr'>
            <b>PARTIDA</b>
          </div>
          <div className='table-up-p-fr'>
            <b>RUBRO</b>
          </div>
          <div className='table-up-p-fr'>
            <b>IMPORTE</b>
          </div>
          <div className='table-right' />
        </div>
        {
          this.props.listaB.map(item =>
            <RowCompoBanco
              key={item.id}
              item={item}
            />
          )
        }
      </div>
    )
  }
}
