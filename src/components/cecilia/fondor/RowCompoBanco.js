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

  update = () => {
    this.props.update(this.props.item)
  }

  render () {
    return (
      <div className='table-container-p'>
        <div className='table-left' />
        <div className='table-up-p-frn'>
          <p>{this.props.item.up}</p>
        </div>
        <div className='table-up-p-frn'>
          <p>{this.props.item.par}</p>
        </div>
        <div className='table-up-p-frn'>
          <p>{this.props.item.rubro}</p>
        </div>
        <div className='table-up-p-frn'>
          <div>
            <CurrencyFormat
              value={this.props.item.resdic}
              displayType='text'
              thousandSeparator
              prefix=' $'
            />
            .00
          </div>
        </div>
        <div className='table-cpa'>
          <p>{this.props.item.cpa}</p>
        </div>
        <div className='table-up-p-frn'>
          <button onClick={this.update}>Agregar</button>
        </div>
        <div className='table-right' />
      </div>
    )
  }
}
