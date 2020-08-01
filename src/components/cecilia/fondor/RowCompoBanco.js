import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Fondor.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    return (
      <div className='table-container-p'>
        <div className='table-left' />
        <div className='table-up-p-fr'>
          <p>{this.props.item.up}</p>
        </div>
        <div className='table-up-p-fr'>
          <p>{this.props.item.partida}</p>
        </div>
        <div className='table-up-p-fr'>
          <p>{this.props.item.rubro}</p>
        </div>
        <div className='table-up-p-fr'>
          <div>
            <CurrencyFormat
              value={this.props.item.importe}
              displayType='text'
              prefix=' $'
            />
            .00
          </div>
        </div>
        <div className='table-right' />
      </div>
    )
  }
}
