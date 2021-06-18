import React, { Component } from 'react'
import './ArchivosPago.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import TableHead from '@material-ui/core/TableHead'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: 'Atendido',
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
        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
          <TableCell className='border-icon' style={{ width: '50px' }}>
            <IconButton size='small' onClick={this.toggleOpen.bind(this)}>
              {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className='table-validacion'>
            {this.props.item.NumFacturas}
          </TableCell>
          <TableCell className='table-validacion'>
            {this.props.item.Fondo}
          </TableCell>
          <TableCell className='table-validacion'>
            {this.props.item.FechaI}
          </TableCell>
          <TableCell className='table-validacion'>
            {this.props.item.Contrarecibo}
          </TableCell>
          <TableCell className='table-validacion'>
            {this.props.item.FechaP}
          </TableCell>
          <TableCell className='table-validacion'>
            devol
          </TableCell>
          <TableCell className='table-validacion'>
            <CurrencyFormat
              className='font-tb'
              displayType='text'
              prefix=' $ '
              thousandSeparator
              value={parseFloat(this.props.item.Total).toFixed(2)}
            />
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
            colSpan={12}
          >
            <Collapse in={this.state.open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Typography variant='h6' gutterBottom component='div'>
                  <div style={{ fontWeight: 'bold' }}>Facturas</div>
                </Typography>
                <TableHead>
                  <TableRow>
                    <TableCell className='border-table-v'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Proveedor</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-v2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Folio</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-v2'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Fecha</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-v'>
                      <div className='font-tb'>
                        <div style={{ fontWeight: 'bold' }}>Descripcion</div>
                      </div>
                    </TableCell>
                    <TableCell className='border-table-v2'>
                      <div style={{ fontWeight: 'bold' }}>Importe</div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.item.Xml.map(data =>
                    <TableRow key={data}>
                      <TableCell className='border-table-v'>
                        <div className='font-tb'>
                          {data.nombre}
                        </div>
                      </TableCell>
                      <TableCell className='border-table-v2'>
                        <div className='font-tb'>
                          {data.folio}
                        </div>
                      </TableCell>
                      <TableCell className='border-table-v2'>
                        <div className='font-tb'>
                          {data.fecha}
                        </div>
                      </TableCell>
                      <TableCell className='border-table-v'>
                        <div className='font-tb'>
                          {data.descripcion}
                        </div>
                      </TableCell>
                      <TableCell className='border-table-v2'>
                        <CurrencyFormat
                          className='font-tb'
                          displayType='text'
                          prefix=' $ '
                          thousandSeparator
                          value={parseFloat(data.total).toFixed(2)}
                        />
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
