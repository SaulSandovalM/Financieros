import React, { Component } from 'react'
import './Autorizacion.css'

export default class RowComponent extends Component {
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
    const estaA = this.props.item.estatus
    let table

    if (estaA === 'Pendiente') {
      table =
        <div className='banco-inputs-list'>
          <div className='table-left' />
          <div className='table-banco-up'>
            <p>{this.props.item.vale}</p>
          </div>
          <div className='table-banco-partida'>
            <p>{this.props.item.cantidad}</p>
          </div>
          <div className='table-banco-proyecto'>
            <p>{this.props.item.concepto}</p>
          </div>
          <div className='table-banco-nombre'>
            <p>{this.props.item.area}</p>
          </div>
          <div className='table-banco-monto'>
            <p>{this.props.item.turno}</p>
          </div>
          <div className='table-banco-porcentaje'>
            <button onClick={this.handleUpdate}>Autorizar</button>
          </div>
          <div className='table-right' />
        </div>
    }

    return (
      <div>
        {table}
      </div>
    )
  }
}
