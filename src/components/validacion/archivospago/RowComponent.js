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
      item: 'Atendido'
    }
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='table-v-num'>
            {this.props.item.xmlC.map((item, i) => (
              <TableRow
                scope='row'
                key={i}
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
                className='click-arch'
                onClick={() => window.open(item.url, '_blank')}
              >
                {item.nombre}
              </TableRow>
            ))}
          </TableCell>
          <TableCell className='table-v-num'>
            {this.props.item.filefactura.map((item, i) => (
              <TableRow
                scope='row'
                key={i}
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
                className='click-arch'
                onClick={() => window.open(item.url, '_blank')}
              >
                {item.nombre}
              </TableRow>
            ))}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
