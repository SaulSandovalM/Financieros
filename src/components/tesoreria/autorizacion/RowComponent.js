import React, { Component } from 'react'
import './Autorizacion.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

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
    const estaA = this.props.item.estatus

    return (
      <TableBody>
        {estaA === 'Pendiente' &&
          <TableRow className='caja-inputs'>
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
              {this.props.item.personaR}
            </TableCell>
            <TableCell className='table-v-num'>
              <button onClick={this.update}>Autorizar</button>
            </TableCell>
          </TableRow>
        }
      </TableBody>
    )
  }
}
