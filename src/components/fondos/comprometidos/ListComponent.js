import React, { Component } from 'react'
import './Comprometidos.css'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import Collapse from '@material-ui/core/Collapse'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <TableBody>
        <TableRow>
          <TableCell className='border-icon'>
            <IconButton aria-label='expand row' size='small' className='border-des' onClick={this.toggleOpen.bind(this)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.partida}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.presupuestal}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <div className='font-tb'>
              {this.props.comprometido.rubro}
            </div>
          </TableCell>
          <TableCell className='border-table-area'>
            <div className='font-tb'>
              {this.props.comprometido.area}
            </div>
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.importe_comp}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.iva}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={this.props.comprometido.isr}
            />
          </TableCell>
          <TableCell className='border-table2'>
            <CurrencyFormat
              className='font-tb'
              style={{ textAlign: 'center' }}
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={(parseInt(this.props.comprometido.importe_comp) + parseInt(this.props.comprometido.iva) - parseInt(this.props.comprometido.isr)).toFixed(2)}
            />
          </TableCell>
          <TableCell className='border-icon'>
            <IconButton size='small' className='border-des'>
              <KeyboardArrowUpIcon className='key-style' />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              borderTop: 0,
              borderLeft: '0px solid #fff',
              borderRight: '0px solid #fff'
            }}
            colSpan={12}
          >
            {this.props.comprometido.comprobantes.map(item =>
              <Collapse key={item} in={this.state.open} timeout='auto' unmountOnExit>
                <TableCell className='border-icon'>
                  <IconButton aria-label='expand row' size='small' className='border-des' />
                </TableCell>
                <TableCell className='border-table2'>
                  <div className='font-tb'>
                    {item.folio}
                  </div>
                </TableCell>
                <TableCell className='border-table2'>
                  <div className='font-tb'>
                    {item.fecha.substr(0, 10)}
                  </div>
                </TableCell>
                <TableCell className='border-table2'>
                  <div className='font-tb'>
                    {item.uuid.substr(0, 8)}
                  </div>
                </TableCell>
                <TableCell className='border-table-area'>
                  <div className='font-tb'>
                    {item.nombre}
                  </div>
                </TableCell>
                <TableCell className='border-table2'>
                  <CurrencyFormat
                    className='font-tb'
                    displayType='text'
                    prefix=' $ '
                    thousandSeparator
                    value={parseFloat(item.subtotal).toFixed(2)}
                  />
                </TableCell>
                <TableCell className='border-table2'>
                  <CurrencyFormat
                    className='font-tb'
                    displayType='text'
                    prefix=' $ '
                    thousandSeparator
                    value={parseFloat(item.iva).toFixed(2)}
                  />
                </TableCell>
                <TableCell className='border-table2'>
                  <CurrencyFormat
                    className='font-tb'
                    displayType='text'
                    prefix=' $ '
                    thousandSeparator
                    value={parseFloat(item.isr).toFixed(2)}
                  />
                </TableCell>
                <TableCell className='border-table2'>
                  <CurrencyFormat
                    className='font-tb'
                    style={{ textAlign: 'center' }}
                    displayType='text'
                    prefix=' $ '
                    thousandSeparator
                    value={parseFloat(item.total).toFixed(2)}
                  />
                </TableCell>
                <TableCell className='border-icon'>
                  <IconButton size='small' className='border-des' />
                </TableCell>
              </Collapse>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
