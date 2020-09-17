import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Ampliacion.css'

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
        {this.props.item.ampliacion === 'Ampliacion' &&
          <div>
            <div className='table-container-p'>
              <div className='table-left' />
              <div className='table-up-p-frn-a'>
                <p>{this.props.item.up}</p>
              </div>
              <div className='table-up-p-frn-p'>
                <p>{this.props.item.ogasto}</p>
              </div>
              <div className='table-up-p-frn-p'>
                <p>{this.props.item.rubro}</p>
              </div>
              <div className='table-up-p-frn-p'>
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
              <div className='table-cpa-a'>
                <p>{this.props.item.cpa}</p>
              </div>
              <div className='table-up-p-frn-p'>
                <b>Ampliado</b>
              </div>
              <div className='table-right' />
            </div>
          </div>}
      </div>
    )
  }
}
