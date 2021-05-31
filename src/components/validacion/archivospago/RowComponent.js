import React, { Component } from 'react'
import './ArchivosPago.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      open: false,
      array: []
    }
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='table-v-num'>
            {this.props.item.xmlValidacion}
          </TableCell>
          <TableCell className='table-v-num'>
            {this.props.item.vale}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
