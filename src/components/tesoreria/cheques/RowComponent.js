import React, { Component } from 'react'
import './Cheques.css'
import CurrencyFormat from 'react-currency-format'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido'
    }
  }

  handleUpdate = () => {
    this.props.update(this.props.item)
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='table-c-num'>
            {this.props.item.numCheque}
          </TableCell>
          <TableCell className='table-c-importe'>
            {this.props.item.dirigido}
          </TableCell>
          <TableCell className='table-c-bene'>
            {this.props.item.fechaC}
          </TableCell>
          <TableCell className='table-c-bene'>
            {this.props.item.fechaE}
          </TableCell>
          <TableCell className='table-c-fechae'>
            <CurrencyFormat
              value={this.props.item.importe}
              displayType='text'
              prefix='$ '
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-c-fechae'>
          <div
            className='click-arch'
            onClick={() => window.open(this.props.item.archivo, '_blank')}
          >
          {this.props.item.fileUpdate}
          </div>
          </TableCell>
          <TableCell className='table-c-fechae' align='right'>
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleUpdate}
            >
              Actualizar
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
