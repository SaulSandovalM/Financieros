import React, { Component } from 'react'
import './ArchivosPago.css'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CurrencyFormat from 'react-currency-format'
import TableHead from '@material-ui/core/TableHead'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import firebase from '../../../Firebase'

export default class RowComponent extends Component {
  constructor (props) {
    super(props)
    var user = firebase.auth().currentUser
    var email
    if (user != null) {
      email = user.email
    }
    let admin
    if (email === 'candy@procuraduria.com') {
      admin = 'CANDY'
    } else if (email === 'angel@procuraduria.com') {
      admin = 'ANGEL'
    } else if (email === 'danya@procuraduria.com') {
      admin = 'DANYA'
    }
    this.state = {
      item: 'Atendido',
      open: false,
      realizo: admin
    }
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <div>
        {(this.props.item.realizo === this.state.realizo) &&
          <TableBody style={{ width: '100%', display: 'block' }}>
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
            <TableRow style={{ display: 'block', width: '100%' }}>
              <TableCell
                style={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  borderTop: 0,
                  borderLeft: '0px solid #fff',
                  borderRight: '0px solid #fff',
                  display: 'block',
                  width: '100%'
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
          </TableBody>}
      </div>
    )
  }
}
