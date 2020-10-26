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
    if (up === this.props.search && ogasto === this.props.search2 && rubro === this.props.search3) {
      button =
      <TableRow>
        <TableCell className='table-up-p-frn-a'>
          <p style={{ margin: '0' }}>{this.props.item.up}</p>
        </TableCell>
        <TableCell className='table-up-p-frn-p'>
          <p style={{ margin: '0' }}>{this.props.item.ogasto}</p>
        </TableCell>
        <TableCell className='table-up-p-frn-p'>
          <p style={{ margin: '0' }}>{this.props.item.rubro}</p>
        </TableCell>
        <TableCell className='table-up-p-frn-p'>
        <div>
          <CurrencyFormat
            value={this.props.item.oct}
            displayType='text'
            thousandSeparator
            prefix=' $'
          />
        </div>
        </TableCell>
        <TableCell className='table-cpa-a'>
          <p style={{ margin: '0' }}>{this.props.item.cpa}</p>
        </TableCell>
        <TableCell className='table-up-p-frn-p'>
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
