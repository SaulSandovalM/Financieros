import React, { Component } from 'react'
import './ListVales.css'

export default class RowComponent extends Component {
  render () {
    var auto = this.props.item.estatus
    return (
      <div>
        {auto === 'Pendiente' &&
          <div className='caja-inputs'>
            <div className='table-left' />
            <div className='table-v-num2'>
              <div>{this.props.item.vale}</div>
            </div>
            <div className='table-v-num2'>
              <div>{this.props.item.cheque}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.cantidad}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.cantidadc}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.cantidadr}</div>
            </div>
            <div className='table-v-re'>
              <div>{this.props.item.concepto}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.oficioS}</div>
            </div>
            <div className='table-v-re'>
              <div>{this.props.item.area}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.turno}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.factura}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.recibos}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.sc}</div>
            </div>
            <div className='table-v-num'>
              <div>{this.props.item.fecha}</div>
            </div>
            <div className='table-v-re'>
              <div>{this.props.item.autorizo}</div>
            </div>
            <div className='table-v-re'>
              <div>{this.props.item.personaR}</div>
            </div>
            <div className='table-right' />
          </div>}
      </div>
    )
  }
}
