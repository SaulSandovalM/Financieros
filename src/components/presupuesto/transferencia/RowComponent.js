import React, { Component } from 'react'
import CurrencyFormat from 'react-currency-format'
import './Transferencia.css'
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

  render () {
    return (
      <TableBody>
        {this.props.item.transferencia === 'T/R' ?
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
                  value={((this.props.item.ago + this.props.item.ene)).toFixed(2)}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <input type='checkbox' />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <input type='checkbox' checked={this.props.item.transferencia === 'T/R' ? true : false} />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasene}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasfeb}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasmar}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasabr}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasmay}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasjun}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasjul}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasago}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gassep}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasoct}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasnov}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasdic}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
          </TableRow>
          :
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
                  value={(this.props.item.ampjul - this.props.item.gasjul).toFixed(2)}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <input type='checkbox' checked={this.props.item.transferencia === 'T/A' ? true : false} />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <input type='checkbox' />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampene}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampfeb}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampmar}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampabr}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampmay}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampjun}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampjul}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampago}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampsep}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampoct}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.ampnov}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
            <TableCell className='mes-t'>
              <i>
                <CurrencyFormat
                  value={this.props.item.gasdic}
                  displayType='text'
                  thousandSeparator
                  prefix=' $'
                />
              </i>
            </TableCell>
          </TableRow>}
      </TableBody>
    )
  }
}
