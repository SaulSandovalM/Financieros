import React, { Component } from 'react'
import './Comprometidos.css'

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
    const par = this.props.item.ogasto
    const up = this.props.item.up
    let button;
    if (par === this.props.search && up === this.props.search2 ) {
      button =
      <div>
        <div className='row-c-b'>
          <div className='row-c'>
            <div className='row-c-c'>
              <p className='pp-c'>{this.props.item.ogasto}</p>
            </div>
            <div className='row-c-c'>
              <p className='pp-c'>{this.props.item.up}</p>
            </div>
          </div>
          <div className='row-c-c'>
            <div className='but-agr' onClick={this.update}>Agregar</div>
          </div>
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
