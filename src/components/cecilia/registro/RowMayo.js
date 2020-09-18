import React, { Component } from 'react'
import './Registro.css'
import CurrencyFormat from 'react-currency-format'

export default class RowMayo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const saldo = this.props.item.may
    const gasto = this.props.item.gasmay
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
          <p className='p-meses-row'>Mayo</p>
        </div>
        <div className='table-meses-asig'>
          <CurrencyFormat
            value={saldo + gasto}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-gas'>
          <CurrencyFormat
            value={this.props.item.gasmay}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-saldo'>
          <CurrencyFormat
            value={this.props.item.may}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </div>
        <div className='table-meses-dis'>
          <CurrencyFormat
            value={this.props.item.may}
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
