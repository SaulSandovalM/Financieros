import React, { Component } from 'react'
import './Valeslist.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CurrencyFormat from 'react-currency-format'

export default class Sumatoria extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      open: false
    }
  }

  update = () => {
    this.props.update(this.props.item)
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='border-icon' />
          <TableCell className='table-v-num'></TableCell>
          <TableCell className='table-v-num'></TableCell>
          <TableCell className='table-v-num'>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num'>
            <CurrencyFormat
              value={this.props.item.cantidadc}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num'>
            <CurrencyFormat
              value={this.props.item.cantidadr}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num'>
            <CurrencyFormat
              value={this.props.item.cantidadr}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num' style={{ width: '150px' }}></TableCell>
          {/*<TableCell className='table-v-num'><b>Oficio S</b></TableCell>*/}
          <TableCell className='table-v-num' style={{ width: '150px' }}></TableCell>
          {/*<TableCell className='table-v-num'><b>Turno</b></TableCell>
          <TableCell className='table-v-num'><b>Facturas</b></TableCell>
          <TableCell className='table-v-num'><b>Recibos</b></TableCell>
          <TableCell className='table-v-num'><b>S/C</b></TableCell>
          <TableCell className='table-v-num'><b>Fecha</b></TableCell>
          <TableCell className='table-v-num'><b>Autorizo</b></TableCell>*/}
          <TableCell className='table-v-num'></TableCell>
          <TableCell className='table-v-num'></TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
