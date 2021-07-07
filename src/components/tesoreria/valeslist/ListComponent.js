import React, { Component } from 'react'
import './Valeslist.css'
import RowComponent from './RowComponent'
import firebase from '../../../Firebase'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import XLSX from 'xlsx'
import CurrencyFormat from 'react-currency-format'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: [],
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      comprobado: false,
      auto: '',
      pend: '',
      noauto: '',
      comp: '',
      prueba: '',
      filteredData: ''
    }
    this.handleExcel = this.handleExcel.bind(this)
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentWillMount () {
    firebase.database().ref('vales/').on('child_added', snapshot => {
      this.setState({
        vales: this.state.vales.concat(snapshot.val())
      })
    })
  }

  toggleCheckAuto (event) {
    this.setState({
      auto: event.target.name,
      autorizados: !this.state.autorizados
    })
  }

  toggleCheckNoAuto (event) {
    this.setState({
      noauto: event.target.name,
      noautorizados: !this.state.noautorizados
    })
  }

  toggleCheckPendientes (event) {
    this.setState({
      pend: event.target.name,
      pendientes: !this.state.pendientes
    })
  }

  toggleCheckComprovado (event) {
    this.setState({
      comp: event.target.name,
      comprobado: !this.state.comprobado
    })
  }

  handleExcel () {
    const vales = [['#V', '#C', 'AUTORIZADO', 'COMPOBADO', 'REEM/REIN', 'CONCEPTO',
      'OFICIO S', 'AREA', 'TURNO', 'FACTURA', 'RECIBOS', 'S/C', 'FECHA', 'AUTORIZA', 'RECIBIO']]
    this.state.pp.forEach((vale) => {
      const valeArray = [vale.vale, vale.cheque, vale.cantidad, vale.cantidadc,
        vale.cantidadr, vale.concepto, vale.oficioS, vale.area,
        vale.turno, vale.factura, vale.recibos, vale.sc, vale.fecha,
        vale.autorizo, vale.personaR]
      vales.push(valeArray)
    })
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(vales)
    XLSX.utils.book_append_sheet(wb, wsAll, 'Vales')
    XLSX.writeFile(wb, 'Lista_Vales.xlsx')
  }

  render () {
    var { auto, pend, noauto, comp, filteredData } = this.state
    var fechah = new Date(this.state.prueba).getMonth() + 1
    filteredData = this.props.lista.filter(
      (vales) => {
        return (auto.length && auto.includes(vales.estatus) && this.state.autorizados && new Date(vales.fecha).getMonth() + 1 === fechah) ||
          (pend.length && pend.includes(vales.cheque) && this.state.pendientes && new Date(vales.fecha).getMonth() + 1 === fechah) ||
          (noauto.length && noauto.includes(vales.estatus) && this.state.noautorizados && new Date(vales.fecha).getMonth() + 1 === fechah) ||
          (comp.length && comp.includes(vales.estatusC) && this.state.comprobado && new Date(vales.fecha).getMonth() + 1 === fechah)
      }
    )

    this.state.pp = filteredData
    
    const total1 = [0]
    filteredData.map(items => (
      total1.push(parseFloat(items.cantidad))
    ))
    const tt1 = (a, b) => a + b
    var tcantidad1 = total1.reduce(tt1)

    const total2 = [0]
    filteredData.map(items => (
      total2.push(parseFloat(items.cantidadc))
    ))
    const tt2 = (a, b) => a + b
    var tcantidad2 = total2.reduce(tt2)

    const total3 = [0]
    filteredData.map(items => (
      items.cantidadr < 0 ? total3.push(parseFloat(items.cantidadr)) : null
    ))
    const tt3 = (a, b) => a + b
    var tcantidad3 = total3.reduce(tt3)

    const total4 = [0]
    filteredData.map(items => (
      items.cantidadr > 0 ? total4.push(parseFloat(items.cantidadr)) : null
    ))
    const tt4 = (a, b) => a + b
    var tcantidad4 = total4.reduce(tt4)

    var real = tcantidad1 - tcantidad3 + tcantidad4

    return (
      <div>
        <FormGroup row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            style={{ border: 'none', background: 'transparent' }}
            label='Observaciones'
            name='prueba'
            type='date'
            value={this.state.prueba}
            onChange={this.handleChange.bind(this)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.autorizados}
                onChange={this.toggleCheckAuto.bind(this)}
                name='Autorizado'
              />
            }
            label='Autorizados'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.noautorizados}
                onChange={this.toggleCheckNoAuto.bind(this)}
                name='Pendiente'
              />
            }
            label='No Autorizados'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.pendientes}
                onChange={this.toggleCheckPendientes.bind(this)}
                name='Pendiente'
              />
            }
            label='Pendientes'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.comprobado}
                onChange={this.toggleCheckComprovado.bind(this)}
                name='Comprobado'
              />
            }
            label='Comprobados'
          />
          <Button
            variant='contained'
            style={{ background: 'green', color: 'white' }}
            onClick={this.handleExcel}
          >
            Excel
          </Button>
        </FormGroup>
        <TableContainer component={Paper} style={{ maxWidth: '100%', height: '69vh' }}>
          <Table>
            <TableHead>
              <TableRow style={{ display: 'flex', flexDirection: 'row', top: '0', background: 'white', zIndex: '3', position: 'sticky' }}>
                <TableCell className='border-icon' style={{ width: '50px' }} />
                <TableCell className='table-v-num' style={{ width: '50px', left: '0px', position: 'sticky', background: 'white' }}><b>Vales</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Cheques</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '150px' }}><b>Pago Real</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Comprobado</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '150px' }}><b>Reintegro</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '150px' }}><b>Reembolso</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '800px' }}><b>Concepto</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '800px' }}><b>Oficio S</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '800px' }}><b>Área</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Turno</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Facturas</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Recibos</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>S/C</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Fecha</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '300px' }}><b>Recibio</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Pasa/NoPasa</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '100px' }}><b>Estatus</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '200px', right: '0px', position: 'sticky', background: 'white' }}><b>Comprobantes</b></TableCell>
              </TableRow>
            </TableHead>
            {
              filteredData.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                  update={this.props.update}
                  obs={this.props.obs}
                />
              )
            }
            <TableRow style={{ display: 'flex', flexDirection: 'row', position: 'relative', top: '0', background: 'white', zIndex: '3' }}>
              <TableCell className='border-icon' style={{ width: '50px' }} />
              <TableCell className='table-v-num' style={{ width: '50px', left: '0px', position: 'sticky', background: 'white' }} />
              <TableCell className='table-v-num' style={{ width: '100px' }} />
              <TableCell className='table-v-num' style={{ width: '150px' }}>
                <b>
                  <CurrencyFormat
                    value={real.toFixed(2)}
                    displayType='text'
                    prefix=' $'
                    thousandSeparator
                    decimalSeparator='.'
                  />
                </b>
              </TableCell>
              <TableCell className='table-v-num' style={{ width: '100px' }}>
                <b>
                  <CurrencyFormat
                    value={parseFloat(tcantidad1).toFixed(2)}
                    displayType='text'
                    prefix=' $'
                    thousandSeparator
                    decimalSeparator='.'
                  />
                </b>
              </TableCell>
              <TableCell className='table-v-num' style={{ width: '100px' }}>
                <b>
                  <CurrencyFormat
                    value={parseFloat(tcantidad2).toFixed(2)}
                    displayType='text'
                    prefix=' $'
                    thousandSeparator
                    decimalSeparator='.'
                  />
                </b>
              </TableCell>
              <TableCell className='table-v-num' style={{ width: '150px' }}>
                <b>
                  <CurrencyFormat
                    value={parseFloat(tcantidad3).toFixed(2)}
                    displayType='text'
                    prefix=' $'
                    thousandSeparator
                    decimalSeparator='.'
                  />
                </b>
              </TableCell>
              <TableCell className='table-v-num' style={{ width: '150px' }}>
                <b>
                  <CurrencyFormat
                    value={parseFloat(tcantidad4).toFixed(2)}
                    displayType='text'
                    prefix=' $'
                    thousandSeparator
                    decimalSeparator='.'
                  />
                </b>
              </TableCell>
              <TableCell className='table-v-num' style={{ width: '150px' }} />
              <TableCell className='table-v-num' style={{ width: '3300px' }} />
            </TableRow>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
