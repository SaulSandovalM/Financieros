import React, { Component } from 'react'
import './Registro.css'
import CurrencyFormat from 'react-currency-format'

export default class RowAgosto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const saldo = this.props.item.ago
    const gasto = this.props.item.gasago
    return (
      <div className='meses-container-row'>
        <div className='table-left' />
        <div className='table-meses-up'>
          <p className='p-meses-row'>{this.props.item.up}</p>
        </div>
        <div className='table-meses-proy'>
          <p className='p-meses-row'>{this.props.item.proy}</p>
        </div>
        <div className='table-meses-par'>
          <p className='p-meses-row'>{this.props.item.ogasto}</p>
        </div>
        <div className='table-meses-par'>
          <p className='p-meses-row'>{this.props.item.rubro}</p>
        </div>
        <div className='table-meses-con'>
          <p className='p-meses-row-con'>{this.props.item.np}</p>
        </div>
        <div className='table-meses-mes'>
          <p className='p-meses-row'>Agosto</p>
        </div>
        <div className='table-meses-asig'>
          <CurrencyFormat
            value={this.props.item.ago}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-gas'>
          <CurrencyFormat
            value={this.props.item.gasago}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-saldo'>
          <CurrencyFormat
            value={this.props.item.ago}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-dis'>
          <CurrencyFormat
            value={saldo - gasto}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-right' />
      </div>
    )
  }
}
