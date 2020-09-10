import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Reduccion.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      up: ''
    }
  }

  update = () => {
    this.props.update(this.props.item)
  }

  render () {
    const up = this.props.item.up
    const ogasto = this.props.item.ogasto
    const rubro = this.props.item.rubro
    let button;
    if (up === this.props.search && ogasto === this.props.search2 && rubro === this.props.search3) {
      button =
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
                value={this.props.item.sep}
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
            <button onClick={this.update}>Reducir</button>
          </div>
          <div className='table-right' />
        </div>
      </div>
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}