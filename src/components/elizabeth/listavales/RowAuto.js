import React, { Component } from 'react'
import './ListVales.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export default class RowAuto extends Component {
  render () {
    var auto = this.props.item.estatus
    return (
      <TableBody>
        {auto === 'Autorizado' &&
          <TableRow>
            <TableCell className='table-v-num2'>
              {this.props.item.vale}
            </TableCell>
            <TableCell className='table-v-num2'>
              {this.props.item.cheque}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.cantidad}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.cantidadc}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.cantidadr}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.concepto}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.oficioS}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.area}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.turno}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.factura}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.recibos}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.sc}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.fecha}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.autorizo}
            </TableCell>
            <TableCell className='table-v-num'>
              {this.props.item.personaR}
            </TableCell>
          </TableRow>}
      </TableBody>
    )
  }
}
