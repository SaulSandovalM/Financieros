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
    var f = new Date(this.props.item.rein)
    var today = new Date()
    var meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    today = f.getDate() + 1 + '-' + meses[f.getMonth()] + '-' + f.getFullYear()

    console.log(fechaSelect)

    return (
      <div style={{ width: '100%' }}>
        {this.props.item.rein === fechaSelect && this.props.item.cheque !== 'Cancelado' &&
          <div className='tabla-arq'>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.vale}</p>
            </div>
            <div className='tb-1'>
              <p className='tb-nr'>{this.props.item.cheque}</p>
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
              <p className='tb-nr'>{today}</p>
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
