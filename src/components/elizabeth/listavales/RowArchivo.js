import React, { Component } from 'react'
import './ListVales.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import CurrencyFormat from 'react-currency-format'

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
          <CurrencyFormat
            value={this.props.item.cantidad}
            displayType='text'
            prefix=' $'
            thousandSeparator
            decimalSeparator='.'
          />
        </TableCell>
        <TableCell className='table-v-num2'>
          <CurrencyFormat
            value={this.props.item.cantidadc}
            displayType='text'
            prefix=' $'
            thousandSeparator
            decimalSeparator='.'
          />
        </TableCell>
        <TableCell className='table-v-num2'>
          <CurrencyFormat
            value={this.props.item.cantidadr}
            displayType='text'
            prefix=' $'
            thousandSeparator
            decimalSeparator='.'
          />
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
          {this.props.item.recibos}
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
