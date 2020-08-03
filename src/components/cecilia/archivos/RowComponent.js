import React, { Component } from 'react'
import './Archivos.css'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    var oficioA = this.props.item.oficioA
    var oficioS = this.props.item.oficioS
    var excel = this.props.item.excel
    
    return (
      <div>
       <div className='archivos-container-row'>
        <div className='table-left' />
        <div className='table-archivos'>
          <p
            className='p-archivos-row-url'
            onClick={() => window.open(oficioS, '_blank')}
          >
            {this.props.item.fileNameS}
          </p>
        </div>
        <div className='table-archivos'>
          <p
            className='p-archivos-row-url'
            onClick={() => window.open(oficioA, '_blank')}
          >
            {this.props.item.fileNameA}
          </p>
        </div>
        <div className='table-archivos'>
          <p
            className='p-archivos-row-url'
            onClick={() => window.open(excel, '_blank')}
          >
            {this.props.item.fileNameE}
          </p>
        </div>
        <div className='table-archivos'>
          <p className='p-archivos-row'>
            {this.props.item.tipo}
          </p>
        </div>
        <div className='table-right' />
      </div>
    )
  }
}
