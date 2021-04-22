import React, { Component } from 'react'
import './Comprometidos.css'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import TableHead from '@material-ui/core/TableHead'
// import DeleteIcon from '@material-ui/icons/Delete'

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
              value={this.props.comprometido.total}
            />
          </TableCell>
          <TableCell className='border-icon'>
            <IconButton size='small' className='border-des' />
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
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Typography variant='h6' gutterBottom component='div'>
                  <div style={{ fontWeight: 'bold' }}>Facturas</div>
                </Typography>
                <TableHead>
                  <TableRow>
                    <TableCell className='border-icon'>
                      <IconButton aria-label='expand row' size='small' className='border-des' />
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Folio</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Fecha</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Uid</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-area'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Nombre</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Importe</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Iva</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Isr</div>
                    </TableCell>
                    <TableCell className='border-table2'>
                      <div style={{ fontWeight: 'bold' }}>Total</div>
                    </TableCell>
                    <TableCell className='border-icon'>
                      <IconButton size='small' className='border-des' />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.comprometido.comprobantes.map(item =>
                    <TableRow key={item}>
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
                    </TableRow>
                  )}
                </TableBody>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}
