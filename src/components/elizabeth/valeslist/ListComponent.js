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
import Sumatoria from './Sumatoria'

export default class ListComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      vales: [],
      autorizados: false,
      noautorizados: false,
      pendientes: false,
      comprovado: false,
      auto: '',
      pend: '',
      noauto: '',
      comp: ''
    }
    this.handleExcel = this.handleExcel.bind(this)
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
      comprovado: !this.state.comprovado
    })
  }

  limpiar () {
    this.setState({
      auto: '',
      autorizados: false,
      pend: '',
      pendientes: false,
      noauto: '',
      noautorizados: false,
      comp: '',
      comprovado: false
    })
  }

  handleExcel () {
    const vales = [['#V', '#C', 'AUTORIZADO', 'COMPOBADO', 'REEM/REIN', 'CONCEPTO',
      'OFICIO S', 'AREA', 'TURNO', 'FACTURA', 'RECIBOS', 'S/C', 'FECHA', 'AUTORIZA', 'RECIBIO']]
    this.state.vales.forEach((vale) => {
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
    const { auto, pend, noauto, comp } = this.state
    const filteredData = this.state.vales.filter(
      (item) => {
        return (auto.length && auto.includes(item.estatus)) ||
        (pend.length && pend.includes(item.cheque)) ||
        (noauto.length && noauto.includes(item.estatus)) ||
        (comp.length && comp.includes(item.estatus))
      }
    )

    let i = 0
    let total = this.state.vales.map((x, i) => {
      let val = parseInt(x.price)
      i += val
      return i
      console.log('suma ', i)
    })

    return (
      <div>
        <FormGroup row style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                checked={this.state.comprovado}
                onChange={this.toggleCheckComprovado.bind(this)}
                name='Comprobado'
              />
            }
            label='Comprobados'
          />
          <Button
            variant='contained'
            color='primary'
            onClick={this.limpiar.bind(this)}
          >
            Limpiar
          </Button>
          <Button
            variant='contained'
            style={{ background: 'green', color: 'white' }}
            onClick={this.handleExcel}
          >
            Excel
          </Button>
        </FormGroup>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='border-icon' />
                <TableCell className='table-v-num'><b>Vales</b></TableCell>
                <TableCell className='table-v-num'><b>Cheques</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizado</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobado</b></TableCell>
                <TableCell className='table-v-num'><b>Reintegro</b></TableCell>
                <TableCell className='table-v-num'><b>Reembolso</b></TableCell>
                <TableCell className='table-v-num' style={{ width: '150px' }}><b>Concepto</b></TableCell>
                {/*<TableCell className='table-v-num'><b>Oficio S</b></TableCell>*/}
                <TableCell className='table-v-num' style={{ width: '150px' }}><b>Área</b></TableCell>
                {/*<TableCell className='table-v-num'><b>Turno</b></TableCell>
                <TableCell className='table-v-num'><b>Facturas</b></TableCell>
                <TableCell className='table-v-num'><b>Recibos</b></TableCell>
                <TableCell className='table-v-num'><b>S/C</b></TableCell>
                <TableCell className='table-v-num'><b>Fecha</b></TableCell>
                <TableCell className='table-v-num'><b>Autorizo</b></TableCell>*/}
                <TableCell className='table-v-num'><b>Estatus</b></TableCell>
                <TableCell className='table-v-num'><b>Comprobantes</b></TableCell>
              </TableRow>
            </TableHead>
            {
              filteredData.map(item =>
                <RowComponent
                  key={item.id}
                  item={item}
                  update={this.props.update}
                />
              )
            }
            {
              filteredData.map(item =>
                <Sumatoria
                  key={item.id}
                  item={item}
                  update={this.props.update}
                />
              )
            }
          </Table>
        </TableContainer>
      </div>
    )
  }
}
