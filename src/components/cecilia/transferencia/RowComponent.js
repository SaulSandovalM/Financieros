import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Transferencia.css'

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
        {this.props.item.transferencia === 'Transferencia' &&
          <div>
            <div className='table-container-p'>
              <div className='table-left' />
              <div className='table-up-p-frn-t'>
                <p>{this.props.item.up}</p>
              </div>
              <div className='table-up-p-frn-tt'>
                <p>{this.props.item.ogasto}</p>
              </div>
              <div className='table-up-p-frn-tt'>
                <p>{this.props.item.rubro}</p>
              </div>
              <div className='table-up-p-frn-tt'>
                <div>
                  <CurrencyFormat
                    value={this.props.item.sep}
                    displayType='text'
                    thousandSeparator
                    prefix=' $'
                  />
                  .00
                </div>
              </div>
              <div className='table-cpa-t'>
                <p>{this.props.item.cpa}</p>
              </div>
              <div className='table-up-p-frn-tt'>
                <b>Transferido</b>
              </div>
              <div className='table-right' />
            </div>
          </div>}
      </div>
    )
  }
}
