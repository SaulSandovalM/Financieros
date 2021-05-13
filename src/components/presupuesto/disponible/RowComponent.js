import React, { Component } from 'react'
import './Disponible.css'
import CurrencyFormat from 'react-currency-format'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  render () {
    const ene = parseInt(this.props.item.ene)
    const feb = parseInt(this.props.item.feb)
    const mar = parseInt(this.props.item.mar)
    const abr = parseInt(this.props.item.abr)
    const may = parseInt(this.props.item.may)
    const jun = parseInt(this.props.item.jun)
    const jul = parseInt(this.props.item.jul)
    const ago = parseInt(this.props.item.ago)
    const sep = parseInt(this.props.item.sep)
    const oct = parseInt(this.props.item.oct)
    const nov = parseInt(this.props.item.nov)
    const dic = parseInt(this.props.item.dic)

    console.log(this.props.item.ene)

    return (
      <TableBody>
        <TableCell className='table-num-dup'>
          <div>{this.props.item.up}</div>
        </TableCell>
        <TableCell className='table-num-d'>
          <div>{this.props.item.rubro}</div>
        </TableCell>
        <TableCell className='table-num-d'>
          <div>{this.props.item.ogasto}</div>
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.ene}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.feb}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.mar}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.abr}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.may}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.jun}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.jul}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.ago}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.sep}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.oct}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.nov}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={this.props.item.dic}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
        <TableCell className='table-num-d'>
          <CurrencyFormat
            value={ene + feb + mar + abr + may + jun + jul + ago + sep + oct + nov + dic}
            displayType='text'
            thousandSeparator
            prefix='$ '
          />
        </TableCell>
      </TableBody>
    )
  }
}
