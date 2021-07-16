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
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import PublishIcon from '@material-ui/icons/Publish'

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
    } else if (email === 'mario@procuraduria.com') {
      admin = 'MARIO'
    } else if (email === 'hortencia@procuraduria.com') {
      admin = 'HORTENCIA'
    }
    this.state = {
      item: 'Atendido',
      open: false,
      realizo: admin,
      totalReal: ''
    }
  }

  toggleOpen () {
    this.setState({
      open: !this.state.open
    })
  }

  removeValidacion (id) {
    var obj = this.props.item.Xml.indexOf(id)
    var xmlid = this.props.item.id
    this.props.removeValidacion(obj, xmlid)
  }

  addValidacion (id) {
    var xmlid = this.props.item.id
    var dataArriba = this.props.item.Xml.map(item => item)
    this.props.addValidacion(xmlid, dataArriba)
  }

  render () {
    const totalReal = []
    this.props.item.Xml.map(data =>
      totalReal.push(parseFloat(data.total))
    )
    const reducerTotal = (a, b) => a + b
    this.state.totalReal = totalReal.reduce(reducerTotal).toFixed(2)

    var NumFacturas = this.props.item.Xml.map(item => item).length

    return (
      <div>
        {(this.props.item.realizo === this.state.realizo) &&
          <TableBody style={{ width: '100%', display: 'block' }}>
            <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
              <TableCell className='border-icon' style={{ width: '30px' }}>
                <IconButton size='small' onClick={this.toggleOpen.bind(this)}>
                  {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell className='table-validacion'>
                {NumFacturas}
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
                  value={parseFloat(this.state.totalReal).toFixed(2)}
                />
              </TableCell>
              <TableCell className='table-validacion right-val'>
                {this.props.item.Contrarecibo !== ' ' ? <div>Agregado</div> : null}
                <Link className='link-edit' to={`/ContraValidacion/${this.props.item.id}`}>
                  <AssignmentTurnedInIcon />
                </Link>
                <IconButton aria-label='expand row' size='small' className='border-del' onClick={() => this.addValidacion(this.props.item)}>
                  <PublishIcon style={{ color: 'green' }} />
                </IconButton>
              </TableCell>
            </div>
            <TableRow style={{ display: 'flex', width: '100%' }}>
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
                        <TableCell className='border-table-v2'>
                          <div style={{ fontWeight: 'bold' }}>Borrar</div>
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
                          <TableCell className='border-table-v2'>
                            <IconButton aria-label='expand row' size='small' className='border-del' onClick={() => this.removeValidacion(data)}>
                              <DeleteIcon style={{ color: 'red' }} />
                            </IconButton>
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
