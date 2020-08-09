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
      <div>
        {this.props.item.estatus === 'FR' &&
        <div>
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
                  value={this.props.item.dic}
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
              <b>Agregado</b>
            </div>
            <div className='table-right' />
          </div>
        </div>}
      </div>
    )
  }
}
