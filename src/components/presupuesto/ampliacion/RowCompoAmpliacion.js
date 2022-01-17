import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Ampliacion.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export default class RowCompoAmpliacion extends Component {
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
    const up = this.props.item.up
    const ogasto = this.props.item.ogasto
    const rubro = this.props.item.rubro
    let button;
    var year = new Date().getFullYear()
    if (up === this.props.search && ogasto === this.props.search2 && rubro === this.props.search3 && year.toString() === this.props.item.año) {
      button =
        <TableRow>
          <TableCell className='table-up-p-frn-a'>
            <i>{this.props.item.up}</i>
          </TableCell>
          <TableCell className='table-up-p-frn-p'>
            <i>{this.props.item.ogasto}</i>
          </TableCell>
          <TableCell className='table-up-p-frn-p'>
            <i>{this.props.item.rubro}</i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.ene}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.feb}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.mar}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.abr}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.may}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.jun}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.jul}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.ago}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.sep}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.oct}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.nov}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <i>
              <CurrencyFormat
                value={this.props.item.dic}
                displayType='text'
                thousandSeparator
                prefix=' $'
              />
            </i>
          </TableCell>
          <TableCell className='mes-t'>
            <button onClick={this.update}>Ampliar</button>
          </TableCell>
        </TableRow>
    }

    return (
      <TableBody>
        {button}
      </TableBody>
    )
  }
}
