import React, { Component } from 'react'
import './Arqueo.css'
import CurrencyFormat from 'react-currency-format'

export default class RowComponentV extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    var fechaSelect = this.props.fechaSelect
    return (
      <div style={{ width: '100%' }}>
        {this.props.item.fechaP === fechaSelect && this.props.item.cheque !== 'Cancelado' &&
          <div className='tabla-arq'>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.vale}</p>
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.estatus}</p>
            </div>
            <div className='tb-1'>
              <CurrencyFormat
                value={this.props.item.cantidadr}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '5px',
                  fontSize: '12px'
                }}
                displayType='text'
                thousandSeparator
                prefix='$ '
              />
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.fechaP}</p>
            </div>
            <div className='tb-2'>
              <p className='tb-nr'>{this.props.item.concepto}</p>
            </div>
            <div className='tb-3'>
              <p className='tb-nr'>{this.props.item.personaR}</p>
            </div>
          </div>}
      </div>
    )
  }
}
