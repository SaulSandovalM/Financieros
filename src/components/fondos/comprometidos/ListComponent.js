import React, { Component } from 'react'
import './Comprometidos.css'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import Table from '@material-ui/core/Table'
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TableHead from '@material-ui/core/TableHead'

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
        <TableRow className='table-row-c'>
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
          >
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1} style={{ left: '24px', position: 'sticky', background: 'white', width: '38.5%' }}>
                <Typography variant="h6" gutterBottom component="div" >
                  Archivos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff',
                        }}
                      >
                        <b>Observaciones</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                        <b>Facturas</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>

                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                        <b>Recibos</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>

                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}

{/* <TableRow>
  <TableCell
    style={{
      paddingBottom: 0,
      paddingTop: 0,
      borderTop: 0,
      borderLeft: '0px solid #fff',
      borderRight: '0px solid #fff'
    }}
  >
    <Collapse in={this.state.open} timeout='auto' unmountOnExit>
      <Box margin={1} style={{ left: '24px', position: 'sticky', background: 'white', width: '38.5%' }}>
        <Typography variant="h6" gutterBottom component="div" >
          Archivos
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff',
                }}
              >
                <b>Observaciones</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff'
                }}
              >
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff'
                }}
              >
                <b>Facturas</b>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>

            </TableRow>
            <TableRow>
              <TableCell
                style={{
                  borderLeft: '0px solid #fff',
                  borderTop: '0px solid #fff',
                  borderRight: '0px solid #fff'
                }}
              >
                <b>Recibos</b>
              </TableCell>
            </TableRow>
            <TableRow>

            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  </TableCell>
</TableRow> */}
