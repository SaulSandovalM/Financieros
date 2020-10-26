import React, { Component } from 'react'
import './Archivos.css'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

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
      <TableBody>
        <TableCell className='table-arch'>
          <div
            className='click-arch'
            onClick={() => window.open(oficioS, '_blank')}
          >
            {this.props.item.fileNameS}
          </div>
        </TableCell>
        <TableCell className='table-arch'>
          <div
            className='click-arch'
            onClick={() => window.open(oficioA, '_blank')}
          >
            {this.props.item.fileNameA}
          </div>
        </TableCell>
        <TableCell className='table-arch'>
          <div
            className='click-arch'
            onClick={() => window.open(excel, '_blank')}
          >
            {this.props.item.fileNameE}
          </div>
        </TableCell>
        <TableCell className='table-arch'>
          {this.props.item.tipo}
        </TableCell>
      </TableBody>
    )
  }
}
