import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Reduccion.css'

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
        {this.props.item.reduccion === 'Reduccion' &&
          <div>
            <div className='table-container-p'>
              <div className='table-left' />
              <div className='table-up-p-frn-ra'>
                <p>{this.props.item.up}</p>
              </div>
              <div className='table-up-p-frn-r'>
                <p>{this.props.item.ogasto}</p>
              </div>
              <div className='table-up-p-frn-r'>
                <p>{this.props.item.rubro}</p>
              </div>
              <div className='table-up-p-frn-r'>
                <div>
                  <CurrencyFormat
                    value={this.props.item.oct}
                    displayType='text'
                    thousandSeparator
                    prefix=' $'
                  />
                  .00
                </div>
              </div>
              <div className='table-cpa-r'>
                <p>{this.props.item.cpa}</p>
              </div>
              <div className='table-up-p-frn-r'>
                <b>Reducido</b>
              </div>
              <div className='table-right' />
            </div>
          </div>}
      </div>
    )
  }
}
