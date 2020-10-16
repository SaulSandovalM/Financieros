import React, { Component } from 'react'
import '../Comprometidos.css'

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
    return (
      <div>
        <div className='xml-inputs-list'>
          <div className='w-xml'>
            <p>{this.props.item.folio}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.fecha}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.importe}</p>
          </div>
          <div className='w-xml'>
            <p>{this.props.item.usoCFDI}</p>
          </div>
          <div className='w-xml' style={{ padding: '10px' }}>
            <button onClick={this.update}> + </button>
          </div>
        </div>
      </div>
    )
  }
}
