import React, { Component } from 'react'
import './ListVales.css'

export default class RowAuto extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  handleUpdate = () => {
    this.props.update(this.props.item)
  }

  render () {
    return (
      <div class='caja-inputs'>
        <div className='table-left' />
        <div className='table-v-num2'>
          <div>{this.props.item.vale}</div>
        </div>
        <div className='table-v-num2'>
          <div>{this.props.item.cheque}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.cantidad}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.cantidadc}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.cantidadr}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.concepto}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.oficioS}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.area}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.turno}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.sc}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.fecha}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.autorizo}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.personaR}</div>
        </div>
        <div className='table-v-re'>
          <div>{this.props.item.recibos}</div>
        </div>
        <div className='table-v-num'>
          <button onClick={this.handleUpdate}>Agregar</button>
        </div>
        <div class='table-right' />
      </div>
    )
  }
}
