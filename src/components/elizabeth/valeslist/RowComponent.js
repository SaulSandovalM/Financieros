import React, { Component } from 'react'
import './Valeslist.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import CurrencyFormat from 'react-currency-format'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import TableRow from '@material-ui/core/TableRow'
import Collapse from '@material-ui/core/Collapse'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      done: false,
      item: 'Atendido',
      open: false
    }
  }

  update = () => {
    this.props.update(this.props.item)
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <TableBody>
        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
          <TableCell className='border-icon' style={{ width: '50px' }}>
            <IconButton size='small' onClick={this.toggleOpen.bind(this)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.vale}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.cheque}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <CurrencyFormat
              value={this.props.item.cantidad}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <CurrencyFormat
              value={this.props.item.cantidadc}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <CurrencyFormat
              value={this.props.item.cantidadr}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <CurrencyFormat
              value={this.props.item.cantidadr}
              displayType='text'
              prefix=' $'
              thousandSeparator
              decimalSeparator='.'
            />
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '800px' }}>
            {this.props.item.concepto}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '800px' }}>
            {this.props.item.oficioS}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '800px' }}>
            {this.props.item.area}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.turno}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.factura}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.recibos}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.sc}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.fecha}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '300px' }}>
            {this.props.item.personaR}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <input type='checkbox' />
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            {this.props.item.estatus}
          </TableCell>
          <TableCell className='table-v-num2' style={{ width: '100px' }}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.update}
            >
              Agregar
            </Button>
          </TableCell>
        </div>
        <TableRow>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              borderTop: 0,
              borderLeft: '0px solid #fff',
              borderRight: '0px solid #fff'
            }}
            colSpan={17}
          >
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Archivos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                        Facturas
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                        Total ($)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                        {this.props.item.filexml}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          borderLeft: '0px solid #fff',
                          borderTop: '0px solid #fff',
                          borderRight: '0px solid #fff'
                        }}
                      >
                      </TableCell>
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
