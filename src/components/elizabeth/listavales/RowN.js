import React, { Component } from 'react'
import './ListVales.css'

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
    var cheque = this.props.item.cheque
    return (
      <div>
        {cheque === 'Pendiente' &&
          <div class='caja-inputs'>
            <div class='table-left' />
            <div class='table-v-num2'>
              <div>{this.props.item.vale}</div>
            </div>
            <div class='table-v-num2'>
              <div>{this.props.item.cheque}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidad}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidadc}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.cantidadr}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.concepto}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.oficioS}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.area}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.turno}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.factura}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.recibos}</div>
            </div>
            <div class='table-v-num'>
              <div>{this.props.item.sc}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.autorizo}</div>
            </div>
            <div class='table-v-re'>
              <div>{this.props.item.personaR}</div>
            </div>
            <div class='table-v-num'>
              <button onClick={this.update}>Actualizar</button>
            </div>
            <div class='table-right' />
          </div>}
      </div>
    )
  }
}
