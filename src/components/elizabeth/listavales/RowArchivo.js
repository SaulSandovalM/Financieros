import React, { Component } from 'react'
import './ListVales.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

export default class RowAuto extends Component {
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
      <TableBody>
        <TableCell className='table-v-num2'>
          {this.props.item.vale}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.cheque}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.cantidad}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.cantidadc}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.cantidadr}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.concepto}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.oficioS}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.area}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.turno}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.sc}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.fecha}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.personaR}
        </TableCell>
        <TableCell className='table-v-num2'>
          {this.props.item.estatus}
        </TableCell>
        <TableCell className='table-v-num2'>
          <Button
            variant='contained'
            color='primary'
            onClick={this.update}
          >
            Agregar
          </Button>
        </TableCell>
      </TableBody>
    )
  }
}
