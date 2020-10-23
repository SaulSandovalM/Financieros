import React, { Component } from 'react'
import './Registro.css'
import CurrencyFormat from 'react-currency-format'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export default class RowJulio extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const saldo = this.props.item.jul
    const gasto = this.props.item.gasjul
    return (
      <TableRow>
        <TableCell className='table-meses-up'>
          <div>{this.props.item.up}</div>
        </TableCell>
        <TableCell className='table-meses-proy'>
          <div>{this.props.item.proy}</div>
        </TableCell>
        <TableCell className='table-meses-par'>
          <div>{this.props.item.ogasto}</div>
        </TableCell>
        <TableCell className='table-meses-par'>
          <div>{this.props.item.rubro}</div>
        </TableCell>
        <TableCell className='table-meses-con'>
          <div className='hi'>{this.props.item.np}</div>
        </TableCell>
        <TableCell className='table-meses-mes'>
          <div>Julio</div>
        </TableCell>
        <TableCell className='table-meses-asig'>
          <CurrencyFormat
            value={saldo + gasto}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-meses-asig'>
          <CurrencyFormat
            value={this.props.item.gasjul}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-meses-asig'>
          <CurrencyFormat
            value={this.props.item.jul}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-meses-asig'>
          <CurrencyFormat
            value={this.props.item.jul}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
      </TableRow>
    )
  }
}
